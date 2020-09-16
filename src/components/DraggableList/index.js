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
  const [colors, setColors] = useState({})


  const handleCategoryQuestions = (category, newQuestions) => {
    let newList = props.questions.slice(0);
    console.log('hand cat quest', category);
    console.log(newList);
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

  const borderColors = [
    "#EE6EFF",
    "#F76C6C",
    "#A8D0E6",
    "#FF6EC7",
    "#A64AC9",
    "#FFFF66",
    "#1AFE49"
  ]

  const generateQuestionList = () => {
    if(Object.keys(colors).length === 0) {
      let i = 0;
      for (const item of props.questions) {
        colors[item.category] = borderColors[i % borderColors.length];
        i++;
      }
    }

    let questionList = props.questions.map((Q, index) => {
      if(!(Q.category in colors)) {
        console.log('not in colors' );
        let rnd = Math.floor(Math.random() * borderColors.length);
        colors[Q.category] = borderColors[rnd];
      }
      let bgColor = colors[Q.category];
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
            borderColor={bgColor}
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