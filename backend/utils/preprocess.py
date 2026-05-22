import re
import nltk

nltk_data_dirs = nltk.data.path
found_all = True
for pkg in ["punkt", "punkt_tab", "stopwords", "wordnet"]:
    try:
        nltk.data.find(f"tokenizers/{pkg}" if pkg.startswith("punkt") else f"corpora/{pkg}")
    except LookupError:
        found_all = False
        try:
            nltk.download(pkg, quiet=True)
        except Exception:
            pass

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

lemmatizer = WordNetLemmatizer()
try:
    stop_words = set(stopwords.words("english"))
except Exception:
    stop_words = set()

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    try:
        tokens = word_tokenize(text)
    except Exception:
        tokens = text.split()
    tokens = [t for t in tokens if t not in stop_words]
    try:
        tokens = [lemmatizer.lemmatize(t) for t in tokens]
    except Exception:
        pass
    return " ".join(tokens)

def tokenize(text):
    try:
        return word_tokenize(text.lower())
    except Exception:
        return text.lower().split()
