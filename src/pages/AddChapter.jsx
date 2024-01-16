import React, { useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import the styles

const AddChapterForm = () => {
  const [storyId, setStoryId] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [storyChapter, setStoryChapter] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/chapters", {
        story_id: storyId,
        chapter_title: chapterTitle,
        story_chapter: storyChapter,
        last_updated: lastUpdated || new Date().toISOString(), // Use the provided value or generate a new date if not provided
      });

      console.log(response.data); // Handle the response as needed

      // Reset the form
      setStoryId("");
      setChapterTitle("");
      setStoryChapter("");
      setLastUpdated("");
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="mb-3">
              <label>Story ID:</label>
            </div>
            <input
              type="number"
              className="w-full h-10 p-2 text-sm border-gray-500 border-[1px]"
              value={storyId}
              onChange={(e) => setStoryId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label>Chapter Title:</label>
            </div>

            <input
              type="text"
              className="w-full h-10 p-2 text-sm border-gray-500 border-[1px]"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label>Story Chapter:</label>
            </div>

            <ReactQuill
              value={storyChapter}
              onChange={setStoryChapter}
              className=""
            />
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label>Last Updated:</label>
            </div>

            <input
              type="datetime-local"
              value={lastUpdated}
              className="w-full h-10 p-2 text-sm border-gray-500 border-[1px]"
              onChange={(e) => setLastUpdated(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end">
          <a href="/add-story" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</a>
            <button
              type="submit"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
            >
             Save
            </button>
           
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default AddChapterForm;
