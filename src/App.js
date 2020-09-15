import React, { useState } from 'react';
import './App.css';
import SimonTextInput from './components/SimonTextArea'
import DraggableList from './components/DraggableList'

const questionData = [
  {
    "category": "Food", "questions": [
      "What is your favorite fruit?",
      "Do you like sushi or hamburgers more?",
      "Where was pasta invented?"
    ]
  },
  {
    "category": "Sports", "questions": [
      "How many points is a touchdown worth in the NFL?",
      "How many olympic medals does Usian Bolt have?",
      "Lewis Hamilton won his first F1 world championship title with which team?"
    ]
  },
  {
    "category": "Geography", "questions": [
      "What country has the most natural lakes?",
      "What African country served as the setting for Tatooine in Star Wars?",
      "Whats the third largest island in the Caribbean?"
    ]
  },
  {
    "category": "Testing", "questions": [
      "Hello?"
    ]
  },
]

function App() {
  const [questions, setQuestions] = useState(questionData);

  const handleProcess = (newQuestions) => {
    setQuestions(newQuestions);
  }

  return (
    <div className="App">
      <DraggableList questions={questions} onChange={handleProcess} />
      <SimonTextInput questions={questions} onChange={handleProcess} />

    </div>
  );
}

export default App;
