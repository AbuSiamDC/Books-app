import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Update = () => {
  
  const [input,setInput] = useState({
    title: "",
    desc: "",
    price: null,
    cover: ""
  });

  const [file,setFile] = useState(null);

  const navigate = useNavigate()
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  
  const handleChange = (event) => {
    setInput((prev) => ({...prev, [event.target.name]: event.target.value}))
  }
  console.log(input);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      // console.log(file);
      setTimeout(1000)
      const res = await axios.post("http://localhost:8800/upload", formData);
      // console.log(formData);
      // console.log(res.data);
      return res.data
    } catch (err) {
      console.log(err);
    }
  };

  const handleImgUpload = async (event) => {
    event.preventDefault()
      const imgurl = await upload()
      console.log("image url");
      console.log(imgurl);
      setInput((prev) => ({...prev, cover:imgurl}))
      console.log("input inside img upload");
      console.log(input);
   }

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      await axios.put("http://localhost:8800/books/"+bookId, input)
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form">
      <h1>Update</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title"/>
      <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
      <input type="number" placeholder="price" onChange={handleChange} name="price"/>
      {/* <input type="text" placeholder="cover" onChange={handleChange} name="cover"/> */}
      <input type="file" placeholder="cover" onChange={event => setFile(event.target.files[0])} name="cover"/>
      <button className="uploadimg" onClick={handleImgUpload}>Upload Image</button>
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;