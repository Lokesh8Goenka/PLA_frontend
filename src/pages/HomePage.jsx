// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";

const topics = ["History", "Geography", "Political_Science", "Economics"];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-4">
      <h2>Select a Topic</h2>
      <div className="row mt-3">
        {topics.map((topic) => (
          <div key={topic} className="col-md-4 mb-3">
            <button className="btn btn-primary w-100" onClick={() => navigate(`/topic/${topic}`)}>
              {topic}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
