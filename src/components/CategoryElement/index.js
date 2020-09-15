import React, { useState } from 'react';
import './index.css'
import QuestionElement from '../QuestionElement'


function CategoryElement(props) {

  const [from, setFrom] = useState(null);
  const [prevList, setPrevList] = useState(props.questions)

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

  return (
    <div className="category-element">
      <h3>{props.category}</h3>
      {generateQuestionList()}
    </div>
  );
}

export default CategoryElement;