import joblib
import pandas as pd
from pathlib import Path

from app.ai.feature_extractor import extract_features

MODEL_PATH = Path(__file__).parent.parent / "models" / "url_phishing_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_url(url: str):
    features = extract_features(url)

    df = pd.DataFrame([features])

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0]

    confidence = round(float(max(probability)) * 100, 2)

    prediction_text = "Phishing" if prediction == 1 else "Safe"

    if prediction_text == "Phishing":
        risk = "High"
        explanation = (
            "This URL contains characteristics commonly associated with phishing websites."
        )
    else:
        risk = "Low"
        explanation = (
            "This URL appears legitimate and does not match known phishing characteristics."
        )

    return {
        "url": url,
        "prediction": prediction_text,
        "confidence": confidence,
        "risk": risk,
        "explanation": explanation,
        "features": features,
    }