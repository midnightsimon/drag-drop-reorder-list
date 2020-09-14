import React, { useState } from 'react';
import './App.css';
import SimonTextInput from './components/SimonTextArea' 
import DraggableList from './components/DraggableList'
const questionData =[
  "What's your favorite food?", 
  "Where would you like to go on vacation?",
  "Do you prefer mountains or beaches?",
  "Why is the sky blue?",
  "What is love?",
  "Do you think that aliens exist?"
]

function App() {
  const [questions, setQuestions] = useState(questionData);

  function handleProcess(newQuestions) {
    setQuestions(newQuestions);
  }
  return (
    <div className="App">
      <DraggableList 
        questions={questions}
        onChange={handleProcess}
      />
      
      <SimonTextInput 
        questions={questions}
        onChange={handleProcess}
      />

    </div>
  );
}

export default App;
