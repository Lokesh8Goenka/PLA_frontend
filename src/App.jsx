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

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home"; // the card view you pasted above
// import Subject from "./Subject"; // shows topics per subject
// import Topic from "./Topic"; // shows subtopics or MCQs

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/subject/:subject" element={<Subject />} />
//         <Route path="/topic/:subject/:topic" element={<Topic />} />
//       </Routes>
//     </Router>
//   );
// }


// export default App;



