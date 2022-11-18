import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAuthUserData, logout } from '../../Redux/auth-reducers';
import Header from './Header';


class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthUserData, logout })(HeaderContainer);
