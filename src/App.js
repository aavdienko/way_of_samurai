import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Dialogs from './Components/Dialogs/Dialogs';
import Settings from './Components/Settings/Settings';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';

const App = (props) => {
  // Пернесли в index.js и прокинули через props
  // let posts = [
  //   {id: 1, message: 'Hi, how are you?', likesCount: 10},
  //   {id: 2, message: 'It is my first post', likesCount: 201},
  //   {id: 3, message: 'Yo', likesCount: 20}
  // ]

  return (
    <BrowserRouter>
      <div className="app-wraper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wraper-content">
          <Routes>
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/profile/" element={<ProfileContainer />} />
            <Route
              path="/dialogs/*"
              element={
                <DialogsContainer
                // state={props.state.dialogsPage}
                // dispatch={props.dispatch}
                />
              }
            />
            {/* store={props.store} */}
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
