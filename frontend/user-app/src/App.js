
import React, {  useState} from 'react';
import './App.css';

const App=()=> {
  
// const getUser=(event)=>{
//   event.preventDefault();
//   fetch('https://email-optimization.vercel.app/send-email')
//   // fetch("http:localhost:3001/send-mail")
//   .then(res=>res.json())
// .then(json=>console.log(json))
// }

// const call=()=>{
//   fetch('https://email-optimization.vercel.app/call')
//   // fetch("http:localhost:3001/send-mail")
//   .then(res=>res.json())
// .then(json=>console.log(json))
// }
  

  // State to manage form input values
  const [formData, setFormData] = useState({
    subject1: '',
    content1: '',
    subject2: '',
    content2: ''
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., send data to backend)
    console.log('Form submitted with data:', formData);
  };

  return (
    <div>
      <h2>A/B Test Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject 1:</label>
          <input
            type="text"
            name="subject1"
            value={formData.subject1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content 1:</label>
          <textarea
            name="content1"
            value={formData.content1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subject 2:</label>
          <input
            type="text"
            name="subject2"
            value={formData.subject2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content 2:</label>
          <textarea
            name="content2"
            value={formData.content2}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
