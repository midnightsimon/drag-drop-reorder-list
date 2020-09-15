import React, { useEffect, useRef } from 'react';
import { simonPrettyPrint } from '../../util/helpers'
import './index.css'



function SimonTextInput(props) {
  const textAreaRef = useRef(null);

  const handleOnClick = () => {
    props.onChange(JSON.parse(textAreaRef.current.value))
  }

  useEffect(() => {
    textAreaRef.current.value = simonPrettyPrint(props.questions)
  }, [props.questions]);

  return (
    <div className="simon-text-input">

      <textarea 
        ref={textAreaRef} 
        className="json-text-input" 
        defaultValue={simonPrettyPrint(props.questions)}
      />

      <button className="process-button" onClick={handleOnClick}>
        Process
      </button>
      
    </div>
  );
}


export default SimonTextInput;