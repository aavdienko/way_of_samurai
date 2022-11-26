import React, { Suspense } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Settings from './Components/Settings/Settings';
import { HashRouter, Route, Routes } from 'react-router-dom';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './Components/Common/Preloader/Preloader';
import { connect } from 'react-redux';

const DialogsContainer = React.lazy( () => import('./Components/Dialogs/DialogsContainer'))
const News = React.lazy( () => import('./Components/News/News'))
const Music = React.lazy( () => import('./Components/Music/Music'))

// Создали React.lazy для этих компонент:
// import DialogsContainer from './Components/Dialogs/DialogsContainer';
// import News from './Components/News/News';
// import Music from './Components/Music/Music';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <HashRouter>
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
                  <Suspense fallback={<div><Preloader /></div>}>
                    <DialogsContainer />
                  </Suspense>
                }
              />
              <Route 
                path="/news" 
                element={
                  <Suspense fallback={<div><Preloader /></div>}>
                    <News />
                  </Suspense>
              } />
              <Route 
                path="/music" 
                element={
                  <Suspense fallback={<div><Preloader /></div>}>
                    <Music />
                  </Suspense>
                } />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);

// export default compose(withRouter, connect(null, { getAuthUserData }))(App);
