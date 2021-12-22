import React from "react";

function QuestionItem({ question, handleDelete, updateCorrectIndex }) {
  
  const options = question.answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {question.id}</h4>
      <h5>Prompt: {question.prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={question.correctIndex} onChange ={(event) => updateCorrectIndex(question.id, event.target.value)}>{options}</select>
      </label>
      <button onClick ={() => handleDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
