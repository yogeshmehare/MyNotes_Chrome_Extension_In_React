import { createRequire } from 'module';
import express from "express";
const require = createRequire(import.meta.url);
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(express.json())
const dotenv = require('dotenv');
dotenv.config()
const port = 3000;

const { MongoClient } = require("mongodb");
// const uri = "mongodb://127.0.0.1:27017/"
let db
let Notes
function connectToLocalDB(cb) {
  Notes = process.env.COLLECTION_NAME
  MongoClient.connect(process.env.DB_CONN_STRING).then((client)=>{
    db = client.db(process.env.DB_NAME)
    return cb()
  }).catch((err)=>{console.log(err);return cb(err)})
}

connectToLocalDB((err)=>{
  if(!err){
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });    
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/api/insertNote', (req, res) => {
  console.log(req.body)
  let title = req.body.title
  let content = req.body.content

  db.collection(Notes).insertOne({title : title, content: content}).then(async(result)=> {
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`, 
    );
    // res.status(200).send()
    let data = await db.collection(Notes).findOne({_id: new ObjectId(result.insertedId)})
    res.send(JSON.stringify(data)).status(200)

  }).catch((err)=>{res.status(500).json({err:"Couldn't create note "+err})});
});

app.get('/api/getNotes', async(req, res) => { 
  console.log("req came")
  let data = await db.collection(Notes).find().toArray()
  res.send(JSON.stringify(data)).status(200)
  console.log(data)
  console.log("done")
  // .then((result)=> {
  //   console.log(
  //     `A document are: ${result}`, 
  //   );
  //   // res.status(200).json({"id":result.insertedId,"name":user.userName,"email":user.email})
  //   res.status(200).send()
  // }).catch((err)=>{res.status(500).json({err:"Couldn't get note "+err})});
});




/* 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yogeshmehare124:yogeshm124@cluster0.qhivk4t.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("NotesDB").then((db)=>{
//       db = db
//     }).command({ ping: 1 });
  
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

let db
function connectToDB(cb) {
  MongoClient.connect(uri).then((client)=>{
    db = client.db("NotesDB")
    return cb()
  }).catch((err)=>{console.log(err);return cb(err)})
}

function fetchNotes() {
  let data1
  db.collection("Notes").find().then((data)=>{
    data1=data
    console.log(data)
  })
}

connectToDB((err)=>{
  if(!err){
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });    
  }
})
document.getElementById("fetchNoteButton").addEventListener("click",()=>{
  fetchNotes()
})
 */