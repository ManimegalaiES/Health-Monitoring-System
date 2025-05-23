import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { setPrompt } from './promptstore';
import AIMODAL from './service/AIMODAL';

import { Circles } from 'react-loader-spinner';

function Home({ formData, handleChange, handleSubmit, prediction, loading }) {
  const navigate = useNavigate();

  return (
    <div className="App" style={{ paddingTop: '30px' }}>
      <h1 style={{ animation: 'fadeIn 1s ease' }}>Patient Health Prediction</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px 40px',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          minHeight: '600px',
          animation: 'fadeInUp 1s ease'
        }}
      >
        {Object.keys(formData).map((field, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <label
              htmlFor={field}
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                fontSize: '14px',
                animation: `fadeInUp 0.5s ease ${index * 0.05}s both`
              }}
            >
              {field}:
            </label>
            <input
              id={field}
              type="text"
              name={field}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                width: '100%',
                minWidth: '200px',
              }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 30px',
              fontSize: '18px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
          >
            Predict
          </button>
          {prediction && (
            <button
              type="button"
              onClick={() => navigate('/suggestions')}
              style={{
                padding: '12px 30px',
                fontSize: '18px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0069d9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              View Suggestions
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ marginTop: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>
            <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
            <p>Loading Prediction...</p>
          </div>
        ) : (
          prediction && (
            <div style={{ marginTop: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <h2
                style={{
                  animation: 'fadeIn 1s ease',
                  color: prediction === '0' ? 'green' : 'red'
                }}
              >
                Prediction: {prediction === '0' ? 'Low Risk' : 'High Risk'}
              </h2>
            </div>
          )
        )}
      </form>
    </div>
  );
}

function Suggestions({ aiResponse }) {

  console.log("AI Response:", aiResponse);
  
  let parsedResponse;

if (!aiResponse) {
  return <p>Suggestions are not available yet.</p>;
}

try {
  parsedResponse = typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;
} catch (error) {
  console.error('Error parsing AI response:', error);
  return <p>Error loading suggestions. Please try again later.</p>;
}


  return (
    <div className="App" style={{ paddingTop: '30px', animation: 'fadeIn 1s ease' }}>
      <h1>Health Suggestions</h1>
      {Array.isArray(parsedResponse?.recommendations) ? (
  parsedResponse.recommendations.map((item, idx) => (
    <div
      key={idx}
      style={{
        marginBottom: '20px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
      }}
    >
      <h3 style={{ color: '#4caf50' }}>{item.category}</h3>
      <p style={{ marginLeft: '20px', marginTop: '5px' }}>
        {item.suggestion}
      </p>
    </div>
  ))
) : (
  <p>Loading suggestions.</p>
)}

    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    'Patient ID': '',
    'Heart Rate': '',
    'Respiratory Rate': '',
    'Body Temperature': '',
    'Oxygen Saturation': '',
    'Systolic Blood Pressure': '',
    'Diastolic Blood Pressure': '',
    'Age': '',
    'Gender': '',
    'Weight (kg)': '',
    'Height (m)': '',
    'Derived_HRV': '',
    'Derived_Pulse_Pressure': '',
    'Derived_MAP': ''
  });

  const [prediction, setPrediction] = useState('');
  const [prompt, setPromptLocal] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt_1 = `Based on the following patient health vitals:
    Heart Rate : ${formData['Heart Rate']} ,
    Respiratory Rate: ${formData['Respiratory Rate']} ,
    Body Temperature: ${formData['Body Temperature']} ,
    Oxygen Saturation: ${formData['Oxygen Saturation']} ,
    Systolic Blood Pressure: ${formData['Systolic Blood Pressure']} ,
    Diastolic Blood Pressure: ${formData['Diastolic Blood Pressure']} ,
    Age: ${formData['Age']} ,
    Gender: ${formData['Gender']} ,
    Weight (kg): ${formData['Weight (kg)']} ,
    Height (m): ${formData['Height (m)']} ,
    Derived HRV: ${formData['Derived_HRV']} ,
    Derived Pulse Pressure: ${formData['Derived_Pulse_Pressure']} ,
    Derived MAP: ${formData['Derived_MAP']} ,
    
    Please suggest:
    - Recommended dietary habits (specific foods if possible)
    - Suitable exercise routines or physical activities
    - Any lifestyle changes they should consider
    - Any warning signs they should watch for
    
    Keep it simple, practical, friendly. No more than 8 points, make sure to give output in the given below json format 
    , remember the format and the content is just an example , give response according to the above provided prompt
    {
  "recommendations": [
    {
      "category": "Diet",
      "suggestion": "Focus on whole, unprocessed foods. Aim for plenty of fruits, vegetables, lean proteins (chicken, fish, beans), and whole grains. Try swapping processed snacks for a handful of nuts or some Greek yogurt."
    },
    {
      "category": "Exercise",
      "suggestion": "Aim for at least 30 minutes of moderate-intensity exercise most days of the week. Walking, swimming, cycling, or dancing are all great options. Start slow and gradually increase the intensity and duration."
    },
    {
      "category": "Hydration",
      "suggestion": "Drink plenty of water throughout the day."
    },
    {
      "category": "Lifestyle Change",
      "suggestion": "Given the weight, incorporating regular strength training alongside cardiovascular exercise can be beneficial for muscle mass and metabolism."
    },
    {
      "category": "Warning Signs",
      "suggestion": "Watch for persistent shortness of breath or dizziness, especially during exercise. Also, be aware of consistent elevations of blood pressure (above 130/80). These are times you should consult your healthcare provider."
    },
    {
      "category": "Sleep Study",
      "suggestion": "If you experience excessive daytime sleepiness, snoring, or pauses in breathing during sleep, consider a sleep study to rule out sleep apnea."
    },
    {
      "category": "Blood Pressure Monitoring",
      "suggestion": "Monitor your blood pressure regularly at home and report any consistently elevated readings to your doctor."
    },
    {
      "category": "Listen to Body",
      "suggestion": "Pay attention to how you feel and adjust your diet and exercise routine accordingly. Don't push yourself too hard, especially when starting a new exercise program."
    }
  ],
  "disclaimer": "This is AI-generated advice and not a substitute for professional medical advice. Consult with your healthcare provider for personalized recommendations."
}.`;

    setPromptLocal(prompt_1);
    setPrompt(prompt_1);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Heart Rate': parseFloat(formData['Heart Rate']),
          'Respiratory Rate': parseFloat(formData['Respiratory Rate']),
          'Body Temperature': parseFloat(formData['Body Temperature']),
          'Oxygen Saturation': parseFloat(formData['Oxygen Saturation']),
          'Systolic Blood Pressure': parseFloat(formData['Systolic Blood Pressure']),
          'Diastolic Blood Pressure': parseFloat(formData['Diastolic Blood Pressure']),
          'Age': parseInt(formData['Age']),
          'Gender': formData['Gender'],
          'Weight (kg)': parseFloat(formData['Weight (kg)']),
          'Height (m)': parseFloat(formData['Height (m)']),
          'Derived_HRV': parseFloat(formData['Derived_HRV']),
          'Derived_Pulse_Pressure': parseFloat(formData['Derived_Pulse_Pressure']),
          'Derived_MAP': parseFloat(formData['Derived_MAP'])
        })
      });
      console.log("In the end of form");
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} prediction={prediction} loading={loading} />}
        />
        <Route path="/suggestions" element={<Suggestions aiResponse={aiResponse} />} />
      </Routes>

      {prompt && <AIMODAL prompt={prompt} setAiResponse={setAiResponse} />}
    </Router>
  );
}

export default App;
