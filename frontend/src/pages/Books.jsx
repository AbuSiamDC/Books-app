import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Link
} from "react-router-dom";


const Books = () => {
  const [books,setBooks] = useState([])

  useEffect(()=>{
    const fetchAllBooks = async ()=>{
        try {
            const res = await axios.get("http://localhost:8800/books")
            setBooks(res.data)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllBooks()
  },[])

  const handleDelete = async(id) => {
    try {
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Dream Catchers Book shop</h1>

      <div className="books">

        {books.map(book=>( // If we use map then we also need to provide a unique key because Each child in a list should have a unique "key"
          <div className="book" key={book.id}> 
            {console.log("book . cover")}
            {console.log(book.cover)}
            {/* {book.cover && <img src={"../../public/upload/"+book.cover} alt="Book Cover" />} */}
            {/* {book.cover && <img src={"../../public/upload/"+book.cover} alt="Book Cover" />} */}
            {book.cover && <img src={"/upload/"+book.cover} alt="Book Cover" />}
            {/* {<img src={"../../public/upload/"+book.cover} alt="Book Cover" />}  */}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>

            <div className="test">
              <button className="delete" onClick={ () => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>
                  Update
                </Link>
              </button>
            </div>
            
          </div>
        ))}

      </div>

      <button className="addNewBookButton">
        <Link to="/add">
          Add new Books
        </Link>
      </button>

    </div>
  );
};

export default Books;
