import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const API_URL = "https://quiet-safely-pegasus.ngrok-free.app";
const subjects = {
  History: ["World War I", "Language", "Constitution"],
  Geography: ["Agriculture", "Climate"],
  Economics: ["Banking"],
  "Political Science": ["Women"]
};


function MCQGenerator() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("Easy"); // Track current level
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [showFeedbackOnly, setShowFeedbackOnly] = useState(false);
  const [questionType, setQuestionType] = useState("Main");
  const [score, setScore] = useState(null);
  const [incorrectSubtopics, setIncorrectSubtopics] = useState([]);

    
  const resetTest = () => {
    setSelectedTopic(null);
    setSelectedSubject(null);
    setQuestions([]);
    setUserAnswers([]);
    setFeedback(null);
    setShowFeedbackOnly(false);
    setCurrentQuestionIndex(0);
    setIncorrectQuestions([]);
    setCurrentLevel("Easy");
    setQuestionType("Main");
    setScore(null);
  };  

  const startTest = async (topic, level) => {
    setSelectedTopic(topic);
    setLoading(true);
    setFeedback(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setIncorrectQuestions([]);
    setCurrentLevel(level);
    setQuestionType("Main");
  
    try {
      const response = await fetch(`${API_URL}/start-test/?topic=${encodeURIComponent(topic)}&level=${level}`, {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "true" }
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
        console.warn("No MCQs received from API");
        // setTimeout(() => startTest(topic, "Easy"), 1000)
        setQuestions([]);
      } else {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  
    setLoading(false);
  };
  
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
          topic: selectedTopic,
          questions: questions,
          // questions: questions.map(q => q.question),
          answers: answers,
          correct_answers: questions.map(q => q.answer),
          question_type : questionType
        })
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const result = await response.json();
      console.log("Backend Response:", result);
  
      if (result.message === "Next Level") {
        if (currentLevel === "Hard") {
          const finalMessage = result.score !== undefined
            ? `Test completed! Final Score: ${result.score.toFixed(2)}%`
            : "Test completed! Well done!";
            
          setFeedback(finalMessage);
          setScore(result.score !== undefined ? result.score.toFixed(2) : null);
          setShowFeedbackOnly(true);
          setQuestionType("Main");

          if (result.Sub_topics && Array.isArray(result.Sub_topics)) {
            const cleanedSubtopics = result.Sub_topics.map(sub =>
              sub.replace(/[\n\r]+/g, " ").trim()
            );
            setIncorrectSubtopics(cleanedSubtopics);
          }         

          setTimeout(() => {
            setShowFeedbackOnly(false);
            resetTest();
          }, 5000);
        }
         else {
          startTest(selectedTopic, result.next_level);
          setCurrentLevel(result.next_level);
        }
      } else if (result.message === "Remedial Questions") {
        setQuestions(result.questions);
        setQuestionType("Remedial");
        setCurrentQuestionIndex(0);
        
        setUserAnswers([]);
      } else if (result.message === "You need more practice") {
        const finalMessage = result.score !== undefined
        ? `You need more practice. Final Score: ${result.score.toFixed(2)}%`
        : "You need more practice.";

        const subtopics = result.Sub_topics.length
        ? `\n\nIncorrect Subtopics: ${result.Sub_topics.join(", ")}`
        : "";

        setFeedback(finalMessage);
        setScore(result.score !== undefined ? result.score.toFixed(2) : null);
        setShowFeedbackOnly(true);
        setQuestionType("Main");

        if (result.Sub_topics && Array.isArray(result.Sub_topics)) {
          setIncorrectSubtopics(result.Sub_topics);
        }
        

        setTimeout(() => {
          resetTest();
        }, 10000);
      } else {
        setFeedback(result.message);
        setShowFeedbackOnly(true);
        setScore(result.score !== undefined ? result.score.toFixed(2) : null);

        if (result.Sub_topics && Array.isArray(result.Sub_topics)) {
          setIncorrectSubtopics(result.Sub_topics);
        }
        

        setTimeout(() => { // Return to topic selection after 5 seconds
          setSelectedTopic(null);
          setShowFeedbackOnly(true);
          setQuestions([]);
          setUserAnswers([]);
          setQuestionType("Main");
          setCurrentQuestionIndex(0);
          setCurrentLevel("Easy");
          setFeedback(null);
          resetTest();
        },5000);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
    setLoading(false);
  };
  
  return (
    <div className="container mt-4 text-center">
      <h1 className="title">Personalized Learning Assistant</h1>

      {showFeedbackOnly ? (
        <>
          <p className="alert alert-info mt-3 feedback-text">{feedback}</p>
          {score !== null && (
            <p className="alert alert-success mt-2">
              Your final score is <strong>{score}%</strong>
            </p>
          )}
          {/* 🔥 Show Incorrect Subtopics if present */}
          {incorrectSubtopics.length > 0 && (
            <div className="alert alert-warning mt-3 text-start">
              <h5>Subtopics you struggled with:</h5>
              <ul>
                {incorrectSubtopics.map((subtopic, idx) => (
                  <li key={idx}>{subtopic}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : !selectedSubject ? (
        <>
          <h2 className="mb-3">Select a Subject</h2>
          <div className="row">
            {Object.keys(subjects).map((subject) => (
              <div key={subject} className="col-md-4 mb-3">
                <button className="btn btn-secondary w-100" onClick={() => setSelectedSubject(subject)}>
                  {subject}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : !selectedTopic ? (
        <>
          <h2 className="mb-3">Select a Topic in {selectedSubject}</h2>
          <button className="btn btn-link mt-3" onClick={() => setSelectedSubject(null)}>
            Back to Subjects
          </button>
          <div className="row">
            {subjects[selectedSubject].map((topic) => (
              <div key={topic} className="col-md-4 mb-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => startTest(topic, "Easy")}
                >
                  {topic}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : loading || questions.length === 0 || !questions[currentQuestionIndex] ? (
        <p className="loading-text">Generating MCQs...</p>
      ) : (
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
     )}
    </div>
  );
}

export default MCQGenerator;