import React, { useState, useRef } from 'react';
import './index.css'
import QuestionElement from '../QuestionElement'
import Modal from '../Modal';


function CategoryElement(props) {

  const [from, setFrom] = useState(null);
  const [prevList, setPrevList] = useState(props.questions)
  const [isAdding, setIsAdding] = useState(false);
  const addQuestionInput = useRef(null);


  const onDragStart = (event) => {
    const draggedFrom = parseInt(event.currentTarget.dataset.index);
    const draggedFromCategory = event.currentTarget.dataset.category;
    setFrom(draggedFrom);
    setPrevList(props.questions);
    props.onQuestionDrag(true, draggedFromCategory, prevList[draggedFrom]);
  }

  const onDragOver = (event) => {
    const draggedOver = parseInt(event.currentTarget.dataset.index);
    const draggedOverCategory = event.currentTarget.dataset.category;
    let filteredList = prevList.slice(0)
    if (draggedOverCategory === props.questionFromCat) {
      const draggedElement = prevList[from];
      filteredList.splice(from, 1);
      filteredList.splice(draggedOver, 0, draggedElement);
      props.onChange(props.category, filteredList);
    }
  }
  const onDragEnd = (event) => {
    props.onQuestionDrag(false);
  }

  const generateQuestionList = () => {
    let questionList = props.questions.map((QuestionText, index) => {
      return (
        <div key={index} data-index={index} data-category={props.category} draggable onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
          <QuestionElement questionText={QuestionText} />
        </div>
      )
    })
    return questionList;
  }

  const addQuestion = () => {
    prevList.push(addQuestionInput.current.value);
    console.log(prevList);
    props.onChange(props.category, prevList);
    setIsAdding(false);
  }

  const showAddButton = () => {

    if(isAdding) {
      return(
        <div className="add-question">
          <input ref={addQuestionInput} className="add-question-input" />
          <div className="add-question-buttons">
            <button className="add-question-submit" onClick={addQuestion}>submit</button>
            <button className="add-question-submit" onClick={() => setIsAdding(false)}>cancel</button>
          </div>

        </div>

      )
    } else {
      return(
        <button className="add-button" onClick={() => setIsAdding(true)}>
        +
      </button>
      )
    }

  }

  return (
    <div className="category-element" style={{borderWidth: 4, backgroundColor: props.borderColor, borderStyle: "solid", borderRadius: 15}} >
      <h3 className="category-heading">{props.category} ({props.questions.length})</h3>
      {generateQuestionList()}
      {showAddButton()}

    </div>
  );
}

export default CategoryElement;