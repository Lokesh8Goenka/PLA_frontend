// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const topicsBySubject = {
//     History: ["World War I", "Language", "Constitution"],
//     Geography: ["Agriculture", "Climate"],
//     Economics: ["Banking"],
//     "Political Science": ["Women"]
// };

// const Subject = () => {
//   const { subject } = useParams();
//   const navigate = useNavigate();
//   const topics = topicsBySubject[subject] || [];
// // Suggested code may be subject to a license. Learn more: ~LicenseLog:267876250.
// //   console.warn(topics);
  
//   return (
//     <div className="container mt-5 text-center">
//       <h2 className="text-primary fw-bold mb-4">{subject} Topics</h2>
//       <button className="btn btn-outline-secondary mb-4" onClick={() => navigate("/")} >
//         Back to Select Subject
//       </button>
//       <div className="d-flex flex-wrap justify-content-center gap-3">
//         {topics.map((topic, idx) => (
//           <button
//             key={idx}
//             className="btn btn-outline-primary btn-lg"
//             style={{ minWidth: "250px", height: "60px", fontWeight: "bold" }}
//             onClick={() => {
//                 console.log("Selected topic:", topic); 
//                 navigate(`/topic/${subject}/${topic}`);
//               }}
//           >
//             {topic}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Subject;
