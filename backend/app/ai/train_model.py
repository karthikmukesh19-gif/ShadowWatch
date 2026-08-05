import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Dataset path
DATASET_PATH = Path(__file__).parent.parent.parent / "datasets" / "PhiUSIIL_Phishing_URL_Dataset.csv"

print("Loading dataset...")
df = pd.read_csv(DATASET_PATH)

print("Dataset Shape:", df.shape)
print("\nString columns:")
print(df.select_dtypes(include=["object", "string"]).columns.tolist())



# Target column
# Separate target
y = df["label"]

# Remove target from features
X = df.drop(columns=["label"])

# Keep only numeric columns
X = X.select_dtypes(include=["number"])

print("Numeric Features:", X.shape[1])

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

print("Training Random Forest...")

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    n_jobs=-1,
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nAccuracy:", accuracy)

print("\nClassification Report:\n")
print(classification_report(y_test, predictions))

# Save Model
MODEL_DIR = Path(__file__).parent.parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

joblib.dump(model, MODEL_DIR / "phishing_model.pkl")

print("\nModel saved successfully!")