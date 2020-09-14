import React, { useState } from 'react';

import QuestionElement from '../QuestionElement'

import './index.css'


function DraggableList(props) {
  const [from, setFrom] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prevList, setPrevList] = useState(props.questions)


  const onDragStart = (event) => {
    const draggedFrom = parseInt(event.currentTarget.dataset.index);
    // console.log("starting to drag from " + draggedFrom + "...");

    setFrom(draggedFrom);
    setIsDragging(true);
    setPrevList(props.questions);
  }

  const onDragOver = (event) => {
    event.preventDefault();
    const draggedOver = parseInt(event.currentTarget.dataset.index);
    // console.log("dragged over " + draggedOver + "...");

    const draggedElement = prevList[from];

    let filteredList = prevList.slice(0)
    filteredList.splice(from, 1);
    filteredList.splice(draggedOver, 0, draggedElement);
    console.log("prev", prevList);
    console.log("filter", filteredList);
    props.onChange(filteredList);
  }

  function generateQuestionList() {
    let questionList = props.questions.map((Q, index) => {
      return (
        <div key={index} data-index={index} draggable onDragStart={onDragStart} onDragOver={onDragOver}>
          <QuestionElement questionText={Q} />
        </div>
      )
    })
    return questionList;
  }

  return (
    <div className="draggable-list-container">
      {generateQuestionList()}
    </div>
  );
}


export default DraggableList;