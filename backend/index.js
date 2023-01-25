import express from 'express'
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';

const app = express()

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test_books'
})

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/public/upload")
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({ storage })
app.post('/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})
  
  
  //   const upload = multer({ dest: './uploads/' })
//   app.post('/upload', upload.single('file'), function (req, res) {
//     res.status(200).json("image has been uploaded")
//   })
  

app.get("/", (req,res)=>{
    res.json("hello this is from the backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)" //we can put values here directly but for security reasons we are not.
    // const values = [
    //     "title1 from backend",
    //     "desc1 from backend",
    //     "cover pic1 from backend"
    // ];
    const values = [ //NOTE in postman use the body and in it use raw and type json(from the drop down manue at the end)
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    // console.log(values)

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been created sucessfully")
    })
})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been deleted sucessfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ?, `price`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
      req.body.price,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, ()=>{
    console.log("connection to backend yeaaa!!!");
})