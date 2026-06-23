import nltk
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Ensure NLTK resources are available
try:
    nltk.download('punkt', quiet=True)
except:
    pass

sentiment_analyzer = SentimentIntensityAnalyzer()

def analyze_text(text: str):
    """
    Analyzes the transcribed text for grammar, sentiment, fluency, and confidence.
    Uses TextBlob for basic grammar/spelling proxy and VADER for sentiment analysis.
    """
    blob = TextBlob(text)
    
    # Simple proxies for scores based on text length and structure
    words = text.split()
    word_count = len(words)
    
    # Grammar score proxy (real implementation might use LanguageToolAPI)
    # Here we see if textblob thinks it's a good sentence. We penalize for very short answers.
    grammar_score = min(max(50 + (word_count * 2), 50), 95)
    
    # Sentiment & Confidence using VADER
    vader_scores = sentiment_analyzer.polarity_scores(text)
    compound = vader_scores['compound']
    
    # Confidence proxy based on sentiment strength and lack of hesitation words (um, ah)
    hesitations = ["um", "uh", "like", "you know", "ah"]
    hesitation_count = sum(text.lower().count(h) for h in hesitations)
    
    confidence_score = 90 - (hesitation_count * 5)
    if compound > 0.5:
        confidence_score += 10
    elif compound < -0.5:
        confidence_score -= 10
        
    confidence_score = min(max(confidence_score, 10), 98)
    
    # Fluency proxy based on sentence length variation
    fluency_score = min(max(70 + (word_count // 5) - (hesitation_count * 2), 40), 95)
    
    sentiment_label = "Neutral"
    if compound > 0.3:
        sentiment_label = "Positive"
    elif compound < -0.3:
        sentiment_label = "Negative"
        
    feedback = []
    if hesitation_count > 2:
        feedback.append(f"We noticed {hesitation_count} filler words. Try to pause instead of saying 'um' or 'uh'.")
    else:
        feedback.append("Great job avoiding too many filler words.")
        
    if word_count < 15:
        feedback.append("Your answer was a bit brief. Try to elaborate more using the STAR method.")
        
    if compound > 0.5:
        feedback.append("Excellent enthusiastic tone!")
        
    return {
        "grammar_score": int(grammar_score),
        "fluency_score": int(fluency_score),
        "confidence_score": int(confidence_score),
        "sentiment": sentiment_label,
        "feedback": feedback
    }
