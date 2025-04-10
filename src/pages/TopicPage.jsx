// src/pages/TopicPage.jsx
import { useParams, useNavigate } from "react-router-dom";

const dummySubTopics = {
  History: ["Women and French Revolution", "Language"],
  Geography: ["Agriculture", "Climate"],
  Political_Science: ["Constitution"],
  Economics: ["Banking"],
  // Add for other topics as needed
};

export default function TopicPage() {
  const { topicName } = useParams();
  const navigate = useNavigate();

  const subTopics = dummySubTopics[topicName] || [];

  return (
    <div className="container text-center mt-4">
      <h3>{topicName} - Choose a Sub-topic</h3>
      <div className="row mt-3">
        {subTopics.map((sub, index) => (
          <div key={index} className="col-md-4 mb-3">
            <button className="btn btn-secondary w-100" onClick={() => navigate(`/test/${topicName}/${sub}`)}>
              {sub}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
