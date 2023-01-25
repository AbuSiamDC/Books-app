import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [input,setInput] = useState({
    title: "",
    desc: "",
    price: null,
    cover: ""
  });

  const navigate = useNavigate()

  
  const handleChange = (event) => {
    setInput((prev) => ({...prev, [event.target.name]: event.target.value}))
  }
  console.log(input);


  const handleClick = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8800/books", input)
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form">
      <h1>Add new book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title"/>
      <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
      <input type="number" placeholder="price" onChange={handleChange} name="price"/>
      <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
      <button className="formButton" onClick={handleClick}>ADD</button>
    </div>
  );
};

export default Add;