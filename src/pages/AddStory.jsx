import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";

const StoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    synopsis: "",
    category_id: "", // You should replace this with an existing category_id
    story_cover: "",
    status_id: "", // You should replace this with an existing status_id
  });
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch statuses
    axios
      .get("http://localhost:5000/statuses")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => console.error("Error fetching statuses:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to create a new story
      const response = await axios.post(
        "http://localhost:5000/stories",
        formData
      );

      console.log("Story created successfully:", response.data);
      // Optionally, you can redirect the user or perform other actions after successful submission.
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Fetch chapters from the server
    axios
      .get("http://localhost:5000/chapters")
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chapters:", error);
      });
  }, []);

  const handleEdit = (chapterId) => {
    navigate(`/edit-chapter/${chapterId}`);
  };

  const handleDelete = (chapterId) => {
    axios
      .delete(`http://localhost:5000/chapters/${chapterId}`)
      .then((response) => {
        console.log("Chapter deleted successfully:", response.data);

        // Update the local state to reflect the deleted chapter
        setChapters((prevChapters) =>
          prevChapters.filter((chapter) => chapter.chapter_id !== chapterId)
        );
      })
      .catch((error) => {
        console.error("Error deleting chapter:", error);
      });
  };

  return (
    <Layout>
      <div className="bg-white p-5 border-[1px] border-gray-200">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex grid-cols-2 items-center gap-5">
            <div className="w-6/12">
              <div>
                <div className="mb-3">
                  <label htmlFor="title">Title:</label>
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full h-10 p-3 border-gray-500 border-[1px]"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-6/12">
              <div className="mb-3">
                <label htmlFor="author">Author:</label>
              </div>
              <div>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="w-full h-10 p-3 border-gray-500 border-[1px]"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label htmlFor="synopsis">Synopsis:</label>
            </div>
            <textarea
              id="synopsis"
              name="synopsis"
              className="w-full h-24 p-3 border-gray-500 border-[1px]"
              value={formData.synopsis}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex grid-cols-2 items-center gap-5">
            <div className="w-6/12">
              <div className="mb-3">
                <label htmlFor="category_id">Category:</label>
              </div>
              <select
                id="category_id"
                name="category_id"
                className="w-full h-10 p-2 text-sm border-gray-500 border-[1px]"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-6/12">
              <div className="mb-3">
                <label htmlFor="story_cover">Story Cover:</label>
              </div>
              <input
                type="text"
                id="story_cover"
                name="story_cover"
                className="w-full h-10 p-2 text-sm border-gray-500 border-[1px]"
                value={formData.story_cover}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex grid-cols-2 items-center gap-5">
            <div className="w-6/12">
              <div className="mb-3">
                <label htmlFor="status_id">Status:</label>
              </div>
              <select
                id="status_id"
                name="status_id"
                className="w-full h-10 p-2 text-sm border-gray-500 border-[1px]"
                value={formData.status_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status.status_id} value={status.status_id}>
                    {status.status_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-6/12"></div>
          </div>
          <div className="my-5 py-3 border-t-[1px] border-gray-300">
            <div className="flex justify-end">
              <a
                href="/add-chapter"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                add chapter
              </a>
            </div>
            <table border="1" className="border-[1px] border-gray-300 w-full">
              <thead className="border-[1px] border-gray-300 border-b-[1px]  text-left">
                <tr className="">
                  <th className="border-r-[1px]  border-gray-300 ">
                    Chapter Title
                  </th>
                  <th className="border-r-[1px]  border-gray-300 ">
                    Last Updated
                  </th>
                  <th className="border-r-[1px]  border-gray-300 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter) => (
                  <tr
                    key={chapter.chapter_id}
                    className="border-[1px] border-gray-300 border-b-[1px]"
                  >
                    <td className="border-[1px] border-gray-300 border-r-[1px]">
                      {chapter.chapter_title}
                    </td>
                    <td className="border-[1px] border-gray-300 border-r-[1px]">
                      {chapter.last_updated}
                    </td>
                    <td className="border-[1px] border-gray-300 border-r-[1px]">
                      <button onClick={() => handleEdit(chapter.chapter_id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(chapter.chapter_id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default StoryForm;
