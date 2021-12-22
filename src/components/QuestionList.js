import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDelete, updateCorrectIndex}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key = {question.id} question = {question} handleDelete={handleDelete} updateCorrectIndex ={updateCorrectIndex} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
