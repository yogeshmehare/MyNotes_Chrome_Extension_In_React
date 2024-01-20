import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";

function App() {
  //variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showInputFields, setshowInputFields] = useState(false);

  function makeNoteFeildsEmpty() {
    setTitle("")
    setContent("")
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Hio</h1>

        {!showInputFields && (
          <Button
            variant="contained"
            id="createNoteButton"
            color="primary"
            onClick={(event: React.MouseEvent<HTMLElement>) =>
              setshowInputFields(true)
            }
          >
            Create new note
          </Button>
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
              style={{"marginRight":"20px","paddingLeft":"10px"}}
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
              style={{"marginRight":"20px","paddingLeft":"10px"}}
              color={content.length > 0 ? "success" : "secondary"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                endIcon={<CheckCircleIcon color="success" />}
                id="createNoteButton"
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  {
                    setshowInputFields(false)
                    makeNoteFeildsEmpty()
                  }
                }
              >
                Create
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<DeleteIcon color="error" />}
                id="closeNoteButton"
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  {
                    setshowInputFields(false);
                    makeNoteFeildsEmpty()
                  }
                }
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

