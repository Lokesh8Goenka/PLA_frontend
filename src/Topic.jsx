// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";

// const API_URL = "https://quiet-safely-pegasus.ngrok-free.app";

// function Topic() {
//   const { subjectName, topicName } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [currentLevel, setCurrentLevel] = useState("Easy");
//   const [incorrectQuestions, setIncorrectQuestions] = useState([]);
//   const [showFeedbackOnly, setShowFeedbackOnly] = useState(false);
//   const [questionType, setQuestionType] = useState("Main");
//   const [score, setScore] = useState(null);
//   const [incorrectSubtopics, setIncorrectSubtopics] = useState([]);

//   useEffect(() => {
//     startTest(topicName, "Easy");
//   }, [topicName]);

//   const resetTest = () => {
//     setQuestions([]);
//     setUserAnswers([]);
//     setFeedback(null);
//     setShowFeedbackOnly(false);
//     setCurrentQuestionIndex(0);
//     setIncorrectQuestions([]);
//     setCurrentLevel("Easy");
//     setQuestionType("Main");
//     setScore(null);
//   };

//   const startTest = async (topic, level) => {
//     setLoading(true);
//     setFeedback(null);
//     setUserAnswers([]);
//     setCurrentQuestionIndex(0);
//     setQuestions([]);
//     setIncorrectQuestions([]);
//     setCurrentLevel(level);
//     setQuestionType("Main");

//     try {
//       const response = await fetch(`${API_URL}/start-test/?topic=${encodeURIComponent(topic)}&level=${level}`, {
//         method: "GET",
//         headers: { "ngrok-skip-browser-warning": "true" },
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
//         setQuestions([]);
//       } else {
//         setQuestions(data.questions);
//       }
//     } catch (error) {
//       console.error("Error fetching MCQs:", error);
//     }

//     setLoading(false);
//   };

//   const handleAnswer = (selectedOption) => {
//     const updatedAnswers = [...userAnswers, selectedOption];
//     setUserAnswers(updatedAnswers);

//     if (selectedOption !== questions[currentQuestionIndex].answer) {
//       setIncorrectQuestions([...incorrectQuestions, questions[currentQuestionIndex]]);
//     }

//     if (updatedAnswers.length === questions.length) {
//       submitAnswers(updatedAnswers);
//     } else {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const submitAnswers = async (answers) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}/submit-answers/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           level: currentLevel,
//           topic: topicName,
//           questions: questions,
//           answers: answers,
//           correct_answers: questions.map((q) => q.answer),
//           question_type: questionType,
//         }),
//       });

//       const result = await response.json();

//       if (result.message === "Next Level") {
//         if (currentLevel === "Hard") {
//           const finalMessage = result.score !== undefined
//             ? `Test completed! Final Score: ${result.score.toFixed(2)}%`
//             : "Test completed! Well done!";
//           setFeedback(finalMessage);
//           setScore(result.score?.toFixed(2));
//           setShowFeedbackOnly(true);

//           if (Array.isArray(result.Sub_topics)) {
//             setIncorrectSubtopics(result.Sub_topics.map((s) => s.trim()));
//           }

//           setTimeout(() => {
//             setShowFeedbackOnly(false);
//             resetTest();
//           }, 5000);
//         } else {
//           startTest(topicName, result.next_level);
//           setCurrentLevel(result.next_level);
//         }
//       } else if (result.message === "Remedial Questions") {
//         setQuestions(result.questions);
//         setQuestionType("Remedial");
//         setCurrentQuestionIndex(0);
//         setUserAnswers([]);
//       } else {
//         const finalMessage = result.score !== undefined
//           ? `${result.message} Final Score: ${result.score.toFixed(2)}%`
//           : result.message;
//         setFeedback(finalMessage);
//         setScore(result.score?.toFixed(2));
//         setShowFeedbackOnly(true);
//         if (Array.isArray(result.Sub_topics)) {
//           setIncorrectSubtopics(result.Sub_topics);
//         }
//         setTimeout(() => resetTest(), 8000);
//       }
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container mt-4 text-center">
//       <h1 className="title">Personalized Learning Assistant</h1>

//       {showFeedbackOnly ? (
//         <>
//           <p className="alert alert-info mt-3 feedback-text">{feedback}</p>
//           {score !== null && (
//             <p className="alert alert-success mt-2">
//               Your final score is <strong>{score}%</strong>
//             </p>
//           )}
//           {incorrectSubtopics.length > 0 && (
//             <div className="alert alert-warning mt-3 text-start">
//               <h5>Subtopics you struggled with:</h5>
//               <ul>
//                 {incorrectSubtopics.map((subtopic, idx) => (
//                   <li key={idx}>{subtopic}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       ) : loading || !questions[currentQuestionIndex] ? (
//         <p className="loading-text">Generating MCQs...</p>
//       ) : (
//         <div className="mcq-test text-center">
//           <h4>{questions[currentQuestionIndex].question}</h4>
//           <div className="d-grid gap-2 mt-3">
//             {["A", "B", "C", "D"].map((option, index) => (
//               <button
//                 key={index}
//                 className="btn btn-outline-primary"
//                 onClick={() => handleAnswer(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Topic;
