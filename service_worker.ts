chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.name === "fetchNotes") {
    console.log("req fetch");
    let apiCall = "http://localhost:3000/api/getNotes";
    fetch(apiCall)
      .then((res) => {
        console.log(res);
        response();
      })
      .catch((err) => {
        response({ err: "Couldn't get note " + err });
      });
  }
  return true;
});

export{} 