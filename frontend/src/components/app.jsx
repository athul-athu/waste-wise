import React, { useEffect, useState } from 'react';
import api from '../services/api';  // Import the API config from api.js

const App = () => {
  const [data, setData] = useState(null);  // State to hold fetched data
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch data on component mount
  useEffect(() => {
    // Example API call to get some data from backend
    api.get('/api/data')  // <-- Change '/api/data' to your actual endpoint
      .then(response => {
        setData(response.data);  // Set the response data to state
        setLoading(false);        // Stop loading
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Stop loading on error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while data is being fetched
  }

  return (
    <div>
      <h1>Data from Backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>  {/* Display data */}
    </div>
  );
};

export default App;
