import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllqueSub } from "../../config/Myservice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./Papers.css";
function Papers({ subject }) {
  // let { subject } = useParams();
  const navigate = useNavigate();

  const [allquesub, setAllquesub] = useState([]);
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login");
    }
    console.log(subject);
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;

    getAllqueSub(email, subject).then((res) => {
      setAllquesub(res.data.data);
    });
  }, []);

  return (
    <div>
      {allquesub.map((paper, i) => (
        <div
          className="papers mt-3 font-weight-bold"
          onClick={() => navigate(`/${subject}/${paper._id}`)}
        >
          {i + 1}
          {"."} {paper.date}
        </div>
      ))}
    </div>
  );
}

export default Papers;
