import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PieChart from './components/PieChart';

const App = () => {
  const [formData, setFormData] = useState({
    subject1: '',
    content1: '',
    subject2: '',
    content2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://email-optimization.vercel.app/send-email', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://email-optimization.vercel.app/call');
      const data = await response.json();
      setExperimentData(data);
    } catch (error) {
      console.error('Error fetching experiment data:', error);
    }
  };

  const [experimentData, setExperimentData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const call1 = () => {
    fetch('https://email-optimization.vercel.app/call1')
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return (
    <div className="form-container">
      <h1 className='heading'>A/B Test Form</h1>
      <form onSubmit={handleSubmit}>
      <h2 className='heading'>Experiment 1</h2>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject1"
            value={formData.subject1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content1"
            value={formData.content1}
            onChange={handleChange}
          />
        </div>
        <h2 className='heading'>Experiment 2</h2>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject2"
            value={formData.subject2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content2"
            value={formData.content2}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="button-group">
        <button onClick={fetchData}>Get Analysis</button>
        <button onClick={call1}>Reset</button>
      </div>
      <div>
      {experimentData && experimentData.exp1 !== null && experimentData.exp2 !== null && experimentData.exp1 > experimentData.exp2 ? (
  <p>Experiment 1 is more likely to yield favorable outcomes</p>
) :experimentData && experimentData.exp1 !== null && experimentData.exp2 !== null && experimentData.exp2 !== 0 ? (
  <p>Experiment 2 is more likely to yield favorable outcomes</p>
) : null}


        {experimentData && <PieChart data={experimentData} />}
      </div>
    </div>
  );
}

export default App;
