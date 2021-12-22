import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3000/questions')
    .then((response) => response.json())
    .then((questionList) => {
      setQuestions(questionList)
    })
  },[])

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [formData.answer1,formData.answer2, formData.answer3, formData.answer4],
        correctIndex: formData.correctIndex
      })
    })
    .then((response) => response.json())
    .then((newQuestion) => {
      const newQuestionList = [...questions, newQuestion]
      setQuestions(newQuestionList)
    })

    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0,
    })

  }

  function handleDelete(id) {
      fetch(`http://localhost:3000/questions/${id}`, {
        method: "DELETE"
      })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestionList = questions.filter((question) => {return question.id !== id})
        setQuestions(updatedQuestionList)
      })
  }

  function updateCorrectIndex(id, correctIndex) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex : correctIndex
      })
    })
    .then((response) => response.json())
    .then((updatedQuestion) => {
      const updatedQuestionList = questions.map((question) => {
        if(question.id === id){
          return updatedQuestion
        }
        else{return question}
      })
      setQuestions(updatedQuestionList)
    })
    


  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm formData ={formData} handleSubmit ={handleSubmit} handleChange ={handleChange} /> : <QuestionList questions = {questions} handleDelete = {handleDelete} updateCorrectIndex = {updateCorrectIndex} />}
    </main>
  );
}

export default App;
