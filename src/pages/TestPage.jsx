import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = "https://0b35-35-247-118-188.ngrok-free.app";

function TestPage() {
  const { topicName, subTopicName } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("Easy");
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [showFeedbackOnly, setShowFeedbackOnly] = useState(false);
  const [questionType, setQuestionType] = useState("Main");
  const [score, setScore] = useState(null);
  const navigate = useNavigate();


  const resetTest = () => {
    setQuestions([]);
    setUserAnswers([]);
    setFeedback(null);
    setShowFeedbackOnly(false);
    setCurrentQuestionIndex(0);
    setIncorrectQuestions([]);
    setCurrentLevel("Easy");
    setQuestionType("Main");
    setScore(null);
    navigate("/");
  };

  const startTest = async (topic, level = "Easy") => {
    setLoading(true);
    setFeedback(null);
    setQuestions([]);
    setUserAnswers([]);
    setShowFeedbackOnly(false);
    setCurrentQuestionIndex(0);
    setIncorrectQuestions([]);
    setQuestionType("Main");
    setScore(null);
    setCurrentLevel(level);

    try {
      const response = await fetch(`${API_URL}/start-test/?topic=${encodeURIComponent(topic)}&level=${level}`, {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "true" }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
        setQuestions([]);
      } else {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (topicName) {
      startTest(topicName); // 👈 auto-start test when page loads
    }
  }, [topicName]);

  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...userAnswers, selectedOption];
    setUserAnswers(updatedAnswers);

    if (selectedOption !== questions[currentQuestionIndex].answer) {
      setIncorrectQuestions([...incorrectQuestions, questions[currentQuestionIndex]]);
    }

    if (updatedAnswers.length === questions.length) {
      submitAnswers(updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const submitAnswers = async (answers) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/submit-answers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: currentLevel,
          topic: topicName,
          questions: questions.map(q => q.question),
          answers: answers,
          correct_answers: questions.map(q => q.answer),
          question_type: questionType
        })
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();

      if (result.message === "Next Level") {
        if (currentLevel === "Hard") {
          setFeedback(`Test completed! Final Score: ${result.score?.toFixed(2)}%`);
          setScore(result.score?.toFixed(2));
          setShowFeedbackOnly(true);
          setTimeout(() => resetTest(), 5000);
        } else {
          startTest(topicName, result.next_level);
        }
      } else if (result.message === "Remedial Questions") {
        setQuestions(result.questions);
        setQuestionType("Remedial");
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
      } else {
        setFeedback(result.message);
        setScore(result.score?.toFixed(2));
        setShowFeedbackOnly(true);
        setTimeout(() => resetTest(), 5000);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4 text-center">
      <h1 className="title">Personalized Learning Assistant</h1>
      <h4 className="text-muted">Topic: {topicName} | Sub-topic: {subTopicName}</h4>

      {showFeedbackOnly ? (
        <>
          <p className="alert alert-info mt-3 feedback-text">{feedback}</p>
          {score !== null && (
            <p className="alert alert-success mt-2">
              Your final score is <strong>{score}%</strong>
            </p>
          )}
        </>
              ) : loading || questions.length === 0 || !questions[currentQuestionIndex] ? (
                <>
                  <button className="btn btn-secondary mb-3" onClick={resetTest}>
                    ← Back to Topics
                  </button>
                  <p className="loading-text">Generating MCQs...</p>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary mb-3" onClick={resetTest}>
                    ← Back to Topics
                  </button>
        
                  <div className="mcq-test text-center">
                    <h4>{questions[currentQuestionIndex].question}</h4>
                    <div className="d-grid gap-2 mt-3">
                      {["A", "B", "C", "D"].map((option, index) => (
                        <button
                          key={index}
                          className="btn btn-outline-primary"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}        
    </div>
  );
}

export default TestPage;
