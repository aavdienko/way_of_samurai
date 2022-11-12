import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import axios from 'axios';
import { getUserProfile } from '../../Redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../../API/api';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId)
    // usersAPI.getProfile(userId)
    //   .then((response) => {
    //     this.props.setUserProfile(response.data);
    //   });
  }

  render() {
    return <Profile {...this.props} />;
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  // isAuth: state.auth.isAuth
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
