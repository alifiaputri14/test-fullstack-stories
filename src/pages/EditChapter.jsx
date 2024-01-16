import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditChapter() {
  const id = useParams();
  const history = useNavigate();

  const [chapterData, setChapterData] = useState({
    chapter_title: '',
    story_chapter: '',
    last_updated: '',
    story_id: '', // Added story_id field
  });

  useEffect(() => {
    // Fetch chapter details using the extracted id
    axios.get(`http://localhost:5000/chapters/${id.chapterId}`)
      .then(response => {
        const { chapter_title, story_chapter, last_updated, story_id } = response.data;
        setChapterData({ chapter_title, story_chapter, last_updated, story_id });
      })
      .catch(error => console.error('Error fetching chapter details:', error));
  }, [id]);

  const handleChange = (e) => {
    setChapterData({
      ...chapterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PATCH request to update the chapter using the extracted id
      await axios.patch(`http://localhost:5000/chapters/${id.chapterId}`, chapterData);
      console.log('Chapter updated successfully');
      // Optionally, you can redirect the user or perform other actions after a successful update.
      history('/add-story'); // Redirect to the chapter table page
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };

  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="chapter_title">Chapter Title:</label>
            <input
              type="text"
              id="chapter_title"
              name="chapter_title"
              value={chapterData.chapter_title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="story_chapter">Story Chapter:</label>
            <textarea
              id="story_chapter"
              name="story_chapter"
              value={chapterData.story_chapter}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="last_updated">Last Updated:</label>
            <input
              type="text"
              id="last_updated"
              name="last_updated"
              value={chapterData.last_updated}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="story_id">Story ID:</label>
            <input
              type="text"
              id="story_id"
              name="story_id"
              value={chapterData.story_id}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </Layout>
    </div>
  );
}

export default EditChapter;
