// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Home() {
//   const navigate = useNavigate();

//   const subjects = [
//     {
//       name: "History",
//       description: "Discover stories from the past.",
//       image: "https://cdn-icons-png.flaticon.com/512/2942/2942131.png",
//     },
//     {
//       name: "Geography",
//       description: "Explore the world and its features.",
//       image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//     },
//     {
//       name: "Economics",
//       description: "Understand money, trade, and markets.",
//       image: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
//     },
//     {
//       name: "Political Science",
//       description: "Learn about governments and power.",
//       image: "https://cdn-icons-png.flaticon.com/512/2791/2791151.png",
//     },
//   ];

//   const handleSubjectClick = (subjectName) => {
//     navigate(`/subject/${subjectName}`);
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center text-primary fw-bold mb-4">Select a Subject</h2>
//       <div className="row">
//         {subjects.map((subject, index) => (
//           <div key={index} className="col-md-6 col-lg-4 mb-4">
//             <div
//               className="card h-100 shadow-sm subject-card text-center"
//               style={{
//                 cursor: "pointer",
//                 width: "200px",
//                 height: "350px",
//                 margin: "auto",
//                 padding: "10px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//               onClick={() => handleSubjectClick(subject.name)}
//             >
//               <img
//                 src={subject.image}
//                 className="card-img-top mx-auto"
//                 alt={subject.name}
//                 style={{ height: "120px", width: "auto", objectFit: "contain" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{subject.name}</h5>
//                 <p className="card-text">{subject.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
