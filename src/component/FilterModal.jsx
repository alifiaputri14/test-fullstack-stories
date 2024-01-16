// FilterModal.jsx
import React, { useState } from "react";
import Dropdown from "../component/Dropdown"; // Adjust the path based on your file structure

const FilterModal = ({ categories, statuses, onSave, onClose, show }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSave = () => {
    onSave({ category: selectedCategory, status: selectedStatus });
    onClose(); // Close the modal after saving
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedStatus("");
  };

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-opacity-40 bg-slate-500 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full flex items-center justify-center max-w-2xl max-h-full">
        {/* Any additional content or styling for the modal backdrop */}
      </div>
      <div className="relative bg-white mx-10 rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Filter
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5 space-y-4">
          <div>
            <label>Filter by Category:</label>
            <Dropdown
              options={[
                "",
                ...categories.map((category) => category.category_name),
              ]}
              selectedOption={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div>
            <label>Filter by Status:</label>
            <Dropdown
              options={["", ...statuses.map((status) => status.status_name)]}
              selectedOption={selectedStatus}
              onSelect={setSelectedStatus}
            />
          </div>
          <div className="flex w-full">
            <div className="w-6/12">
              <button
                onClick={handleReset}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Reset
              </button>
            </div>
            <div className="w-6/12 flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
