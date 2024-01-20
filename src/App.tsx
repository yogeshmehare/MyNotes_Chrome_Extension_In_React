import { useState } from "react";
import "./App.css";

function App() {
  //variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showInputFields, setshowInputFields] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <h1>Hio</h1>
        <button
          id="createNoteButton"
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            setshowInputFields(true)
          }
        >
          Create new note
        </button>

        {showInputFields && (
          <div>
            <input
              type="text"
              placeholder="Enter Title for Note"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Enter Title for Note"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
