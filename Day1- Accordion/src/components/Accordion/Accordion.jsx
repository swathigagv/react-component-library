import { useState } from "react";
import "./accordion.css";

const Accordion = ({ data }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="accordion">
      {data.map((item) => (
        <div key={item.id} className="accordion-item">
          <button
            className="accordion-title"
            onClick={() => handleToggle(item.id)}
          >
            <span>{item.question}</span>
            <span>{openId === item.id ? "-" : "+"}</span>
          </button>

          {openId === item.id && (
            <div className="accordion-content">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;