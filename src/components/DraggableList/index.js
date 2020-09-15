import React, { useState } from 'react';
import CategoryElement from '../CategoryElement'
import './index.css'


function DraggableList(props) {
  const [from, setFrom] = useState(null);
  const [isQuestionDragging, setIsQuestionDragging] = useState(false);
  const [isCategoryDragging, setIsCategoryDragging] = useState(false);
  const [questionFromCat, setQuestionFromCat] = useState(false);
  const [questionBeingDragged, setQuestionBeingDragged] = useState(false);
  const [prevList, setPrevList] = useState(props.questions)


  const handleCategoryQuestions = (category, newQuestions) => {
    let newList = prevList.slice(0);
    newList.forEach((item) => {
      if (item.category === category) {
        item.questions = newQuestions
      }
    })
    props.onChange(newList);
  }

  const handleQuestionDrag = (value, questionFromCat, questionText) => {
    setIsQuestionDragging(value);
    setQuestionFromCat(questionFromCat);
    setQuestionBeingDragged(questionText);
  }

  const onDragStart = (event) => {
    if (isQuestionDragging) {
      event.preventDefault();
    } else {
      const draggedFrom = parseInt(event.currentTarget.dataset.index);
      event.currentTarget.addEventListener('dragend', onDragEnd)
      setFrom(draggedFrom);
      setPrevList(props.questions);
      setIsCategoryDragging(true);
    }
  }

  const onDragOver = (event) => {
    if (isQuestionDragging) {

    } else {
      const draggedOver = parseInt(event.currentTarget.dataset.index);
      const draggedElement = prevList[from];
      let filteredList = prevList.slice(0)
      filteredList.splice(from, 1);
      filteredList.splice(draggedOver, 0, draggedElement);
      props.onChange(filteredList);
    }
  }

  const onDragEnd = (event) => {
    setIsCategoryDragging(false);
  }

  const generateQuestionList = () => {
    let questionList = props.questions.map((Q, index) => {
      return (
        <div key={index} data-index={index} data-category={Q.category} draggable onDragStart={onDragStart} onDragOver={onDragOver}>
          <CategoryElement
            onChange={handleCategoryQuestions}
            onQuestionDrag={handleQuestionDrag}
            category={Q.category}
            questions={Q.questions}
            questionFromCat={questionFromCat}
            isCategoryDragging={isCategoryDragging}
            questionBeingDragged={questionBeingDragged}
          />
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