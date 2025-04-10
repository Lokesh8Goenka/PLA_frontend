import React from "react";
import TestScreen from "./TestScreen";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
      <TestScreen topic="History" />
    </div>
  );
}

export default App;


// src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import TopicPage from "./pages/TopicPage";
// import TestPage from "./pages/TestPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/topic/:topicName" element={<TopicPage />} />
//         <Route path="/test/:topicName/:subTopicName" element={<TestPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;