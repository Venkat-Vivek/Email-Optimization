
// import React, {  useEffect } from 'react';
import './App.css';

const App=()=> {
  
const getUser=(event)=>{
  event.preventDefault();
  fetch('https://email-optimization.vercel.app/send-email')
  // fetch("http:localhost:3001/send-mail")
  .then(res=>res.json())
.then(json=>console.log(json))
}

const call=()=>{
  fetch('https://email-optimization.vercel.app/call')
  // fetch("http:localhost:3001/send-mail")
  .then(res=>res.json())
.then(json=>console.log(json))
}
  
  return (
    <div>
    <h1>My Form</h1>
    <form onSubmit={getUser}>
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" placeholder="Enter a title" required/>

        <label for="content">Content:</label>
        <textarea id="content" name="content" rows="4" placeholder="Enter your content"></textarea>

        <button type="submit">Submit</button>
    </form>
    <button onClick={call}>Get Report</button>
    </div>
  );
}

export default App;
