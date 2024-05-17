
import React, {  useEffect } from 'react';
import './App.css';

const App=()=> {
  
const getUser=()=>{
  fetch('https://email-optimization.vercel.app/send-email')
  // fetch("http:localhost:3001/send-mail")
  .then(res=>res.json())
.then(json=>console.log(json))
}

useEffect(()=>{
  getUser()
})
  
  return (
    <div className="App">
     hi
    </div>
  );
}

export default App;
