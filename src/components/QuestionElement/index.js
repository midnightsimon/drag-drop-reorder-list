import React, {  } from 'react';
import './index.css'


function QuestionElement(props) {
  return (
    <div className="question-element">
      <p className="question-text">{props.questionText}</p>
    </div>
  );
}

export default QuestionElement;