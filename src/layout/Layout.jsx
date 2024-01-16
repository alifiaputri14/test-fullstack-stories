import { IoMdHome } from "react-icons/io";
import React from "react";
import { TiDownload } from "react-icons/ti";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        {/* Navbar Content */}
        <div className="max-w-screen-xl flex flex-wrap  p-4">
          {/* Navbar logo and title */}
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>

          {/* Navbar toggle button */}
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-400 dark:bg-gray-900">
          {/* Sidebar Content */}
          <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 border-r-[1px] border-gray-300">
            <ul class="space-y-2 font-medium">
              <li>
                <a
                  href="/"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <IoMdHome />

                  <span class="ms-3">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/management-story"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <TiDownload />
                  <span class="flex-1 ms-3 whitespace-nowrap">
                    Management Story
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-7">
            {/* Page content goes here */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
