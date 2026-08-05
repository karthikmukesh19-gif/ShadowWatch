import pandas as pd
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

from app.ai.feature_extractor import extract_features

# Dataset path
DATASET_PATH = (
    Path(__file__).parent.parent.parent
    / "datasets"
    / "PhiUSIIL_Phishing_URL_Dataset.csv"
)

print("Loading dataset...")
df = pd.read_csv(DATASET_PATH)

print("Dataset Shape:", df.shape)

print("Extracting URL features...")

feature_rows = []

for url in df["URL"]:
    feature_rows.append(extract_features(str(url)))

X = pd.DataFrame(feature_rows)
y = df["label"]

print("Feature Shape:", X.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training AI model...")

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, pred))

print("\nClassification Report\n")
print(classification_report(y_test, pred))

MODEL_DIR = Path(__file__).parent.parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

joblib.dump(model, MODEL_DIR / "url_phishing_model.pkl")

print("\n✅ url_phishing_model.pkl saved successfully")