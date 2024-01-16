// ManagementStory.jsx
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import Table from "../component/Table/Table";
import FilterModal from "../component/FilterModal";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ManagementStory() {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    // Fetch stories
    axios
      .get("http://localhost:5000/stories")
      .then((response) => {
        console.log(response.data);
        setStories(response.data);
      })
      .catch((error) => console.error("Error fetching stories:", error));

    // Fetch categories
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch statuses
    axios
      .get("http://localhost:5000/statuses")
      .then((response) => {
        console.log(response.data);
        setStatuses(response.data);
      })
      .catch((error) => console.error("Error fetching statuses:", error));

    setLoading(false);
  }, []);

  const applyFilters = (data, filters) => {
    let filteredData = [...data];

    // Apply search term filter
    if (filters.searchTerm) {
      filteredData = filteredData.filter((story) =>
        story.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredData = filteredData.filter(
        (story) => story.category.category_name === filters.category
      );
    }

    // Apply status filter
    if (filters.status) {
      filteredData = filteredData.filter(
        (story) => story.status.status_name === filters.status
      );
    }

    return filteredData;
  };

  const handleFilterSave = (filters) => {
    setSelectedCategory(filters.category);
    setSelectedStatus(filters.status);
    setShowFilterModal(false);
  };

  const handleEdit = (storyId) => {
    // Implement edit functionality
    const handleEdit = (storyId) => {
      // Redirect to the edit-story page with the specified storyId
      history(`/edit-story/${storyId}`);
    };
  };

  const handleDelete = async (storyId) => {
    try {
      // Send a DELETE request to the server to delete the story with the given ID
      await axios.delete(`http://localhost:5000/stories/${storyId}`);

      // Update the state to reflect the deletion
      setStories((prevStories) =>
        prevStories.filter((story) => story.story_id !== storyId)
      );

      console.log(`Story with ID ${storyId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting story with ID ${storyId}:`, error);
    }
  };

  const filteredStories = applyFilters(stories, {
    searchTerm,
    category: selectedCategory,
    status: selectedStatus,
  });

  return (
    <div>
      {showFilterModal && (
        <FilterModal
          categories={categories}
          statuses={statuses}
          onSave={handleFilterSave}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      <Layout>
        <div className="flex items-center mb-5">
          <div className="w-6/12 flex justify-start font-bold text-gray-800 text-2xl">
            List Story
          </div>
          <div className="w-6/12 flex justify-end items-center">
            <div className="mx-3">
              <input
                type="text"
                id="search"
                className="border-[1px] border-gray-500 p-[2px] rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mr-3">
              <a
                type="button"
                className="focus:outline-none rounded-full text-gray-500 bg-white flex items-center justify-center border-gray-500 border-[1px] w-10 h-10  border-solid font-medium rounded-lg text-sm p-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                href="#"
                onClick={() => setShowFilterModal(true)}
              >
                <FaFilter />
              </a>
            </div>
            <div>
              <a
                href="/add-story"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add Story
              </a>
            </div>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b p-2">Title</th>
                <th className="border-b p-2">Category</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStories.map((story) => (
                <tr key={story.story_id}>
                  <td className="border-b p-2">{story.title}</td>
                  <td className="border-b p-2">
                    {story.category.category_name}
                  </td>
                  <td className="border-b p-2">{story.status.status_name}</td>
                  <td className="border-b p-2">
                    <a href={`/edit-story/${story.story_id}`}>Edit</a>
                    <button onClick={() => handleDelete(story.story_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Layout>
    </div>
  );
}

export default ManagementStory;
