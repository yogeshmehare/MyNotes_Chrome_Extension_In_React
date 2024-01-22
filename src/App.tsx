import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";
import NotesListComponent from "./comp/NotesListComponent";

function App() {
  //variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showInputFields, setshowInputFields] = useState(false);
  const [notes, setNotes] = useState<any[]>([])

  function makeNoteFeildsEmpty() {
    setTitle("");
    setContent("");
  }


  useEffect(() => {
    FetchNotesFromDB()
    return () => {
    }
  },[])

  async function FetchNotesFromDB() {
    let apiCallToFetchNotesFromDB = "http://localhost:3000/api/getNotes";
    try {
      const response = await fetch(apiCallToFetchNotesFromDB, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Success:", result);
      setNotes(result)

    } catch (error) {
      console.log(error);
    }
  }



  async function AddNoteToDB() {
    // chrome.runtime.sendMessage({name:"fetchNotes"},(response=>{
    //   console.log(response)
    // }))
    console.log("hiiiii");
    let apiCallInsertNote = "http://localhost:3000/api/insertNote";

    let userData = { title: title, content: content };
    console.log(userData);
    try {
      const response = await fetch(apiCallInsertNote, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      setNotes(notes=>[...notes, result])
      // FetchNotesFromDB()
      console.log("Success:", result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="">
        {!showInputFields && (
          <div>
            <Button
              variant="contained"
              id="createNoteButton"
              color="primary"
              onClick={(_event: React.MouseEvent<HTMLElement>) =>
                setshowInputFields(true)
              }
            >
              Create new note
            </Button>

            <NotesListComponent notes={notes}/>
          </div>
        )}
        {showInputFields && (
          <div>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              placeholder="Enter Title for Note"
              margin="dense"
              fullWidth
              style={{ marginLeft: "20px", marginRight: "20px" }}
              value={title}
              color={title.length > 0 ? "success" : "secondary"}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="note"
              label="Note"
              multiline
              rows={4}
              defaultValue="Default Value"
              placeholder="Enter Note"
              margin="dense"
              fullWidth
              style={{ marginLeft: "20px", marginRight: "20px" }}
              color={content.length > 0 ? "success" : "secondary"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                endIcon={<CheckCircleIcon color="success" />}
                id="createNoteButton"
                onClick={(_event: React.MouseEvent<HTMLElement>) => {
                  setshowInputFields(false);
                  makeNoteFeildsEmpty();
                  AddNoteToDB();
                }}
              >
                Create
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<DeleteIcon color="error" />}
                id="closeNoteButton"
                onClick={(_event: React.MouseEvent<HTMLElement>) => {
                  setshowInputFields(false);
                  makeNoteFeildsEmpty();
                }}
              >
                Close
              </Button>
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
