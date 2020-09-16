import React, {  } from 'react';
import './index.css'


function QuestionElement(props) {

  const handleOnClick = () => {
    props.onDeleteClick(props.index);
  }

  return (
    <div className="question-element">
      <button onClick={handleOnClick} className="delete-question-button">x</button>
      <p className="question-text">{props.questionText}</p>
    </div>
  );
}

export default QuestionElement;