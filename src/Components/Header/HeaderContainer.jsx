import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthUserData } from '../../Redux/auth-reducers copy';
import Header from './Header';
import classes from './Header.module.css';

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true
      })
      .then(response => {
        if (response.data.resultCode === 0) {
          let { id, email, login} = response.data.data
          this.props.setAuthUserData(id, email, login)
        }
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login

})

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);
