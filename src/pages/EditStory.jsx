import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import axios from 'axios';

function EditStory() {
  const { storyId } = useParams();
  console.log(storyId);

  const [oldValue, setOldValue] = useState({});
  const [newValue, setNewValue] = useState({});

  useEffect(() => {
    // Fetch the old value of the story using the ID
    axios
      .get(`http://localhost:5000/stories/${storyId}`)
      .then((response) => {
        console.log(response.data);
        setOldValue(response.data);
        setNewValue(response.data); // Set the initial value for newValue
      })
      .catch((error) => console.error('Error fetching old value:', error));
  }, [storyId]);

  // Define a function to handle the edit
  const handleEdit = async () => {
    try {
      // Convert category_id and status_id to strings if they are not
      const patchedValue = {
        ...newValue,
        category_id: String(newValue.category_id),
        status_id: String(newValue.status_id),
      };

      // Send a PATCH request to update the story with the new values
      await axios.patch(`http://localhost:5000/stories/${storyId}`, patchedValue);

      console.log(`Story with ID ${storyId} edited successfully.`);
    } catch (error) {
      console.error(`Error editing story with ID ${storyId}:`, error);
    }
  };

  return (
    <div>
      <Layout>
        {/* Your form or UI components go here */}
        {/* Use controlled components to display old values and allow modification */}
        <input
          type="text"
          value={newValue.title || ''}
          onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
        />

        {/* Add more form fields as needed */}
        <input
          type="text"
          value={newValue.category_id || ''}
          onChange={(e) => setNewValue({ ...newValue, category_id: e.target.value })}
        />
        <input
          type="text"
          value={newValue.status_id || ''}
          onChange={(e) => setNewValue({ ...newValue, status_id: e.target.value })}
        />

        <button onClick={handleEdit}>Save Changes</button>
      </Layout>
    </div>
  );
}

export default EditStory;
