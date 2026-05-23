import sqlite3
import os
import hashlib
import uuid

DB_DIR = os.path.join(os.path.dirname(__file__), "data")
DB_PATH = os.path.join(DB_DIR, "app.db")
os.makedirs(DB_DIR, exist_ok=True)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            bio TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            match_percentage INTEGER,
            matching_skills TEXT DEFAULT '[]',
            missing_skills TEXT DEFAULT '[]',
            job_description TEXT DEFAULT '',
            filename TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    """)
    conn.commit()
    conn.close()


def hash_password(password):
    salt = hashlib.sha256(os.urandom(32)).hexdigest().encode("utf-8")
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000).hex() + salt.decode("utf-8")


def verify_password(password, stored_hash):
    salt = stored_hash[-64:].encode("utf-8")
    stored_pwd = stored_hash[:-64]
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000).hex() == stored_pwd


def create_user(username, email, password):
    conn = get_db()
    try:
        conn.execute("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
                     (username, email, hash_password(password)))
        conn.commit()
        user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        return dict(user)
    except sqlite3.IntegrityError as e:
        raise ValueError("Username or email already exists")
    finally:
        conn.close()


def authenticate_user(email, password):
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    conn.close()
    if user and verify_password(password, user["password_hash"]):
        return dict(user)
    return None


def get_user_by_id(user_id):
    conn = get_db()
    user = conn.execute("SELECT id, username, email, bio, created_at FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(user) if user else None


def update_user(user_id, data):
    conn = get_db()
    conn.execute("UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?",
                 (data.get("username"), data.get("email"), data.get("bio", ""), user_id))
    conn.commit()
    conn.close()


def save_analysis(user_id, data):
    conn = get_db()
    import json
    conn.execute("""INSERT INTO analyses (user_id, match_percentage, matching_skills, missing_skills, job_description, filename)
                    VALUES (?, ?, ?, ?, ?, ?)""",
                 (user_id, data.get("match_percentage"),
                  json.dumps(data.get("matching_skills", [])),
                  json.dumps(data.get("missing_skills", [])),
                  data.get("job_description", ""),
                  data.get("filename", "")))
    conn.commit()
    analysis_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return analysis_id


def get_analyses(user_id):
    conn = get_db()
    rows = conn.execute("SELECT * FROM analyses WHERE user_id = ? ORDER BY created_at DESC", (user_id,)).fetchall()
    conn.close()
    import json
    results = []
    for r in rows:
        r = dict(r)
        r["matching_skills"] = json.loads(r["matching_skills"])
        r["missing_skills"] = json.loads(r["missing_skills"])
        results.append(r)
    return results
