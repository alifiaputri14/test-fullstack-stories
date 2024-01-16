import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ManagementStory from './pages/ManagementStory';
import AddStory from './pages/AddStory';
import AddChapter from './pages/AddChapter';
import EditChapter from './pages/EditChapter';
import EditStory from './pages/EditStory';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/management-story" Component={ManagementStory} />
        <Route path="/add-story" Component={AddStory} />
        <Route path="/add-chapter" Component={AddChapter} />
        <Route path="/edit-chapter/:chapterId" Component={EditChapter}/>
        <Route path="/edit-story/:storyId" Component={EditStory}/>
      </Routes>
    </Router>
  );
};

export default App;
