import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile} from '../../Redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }



  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState ,snapshot) {
    if (this.props.match.params.userId != prevProps.match.params.userId){
      this.refreshProfile()
    }
  }

  render() {
    return <Profile {...this.props}
                    isOwner={!this.props.match.params.userId} 
                    profile={this.props.profile} 
                    status={this.props.status} 
                    updateUserStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    />
                    // saveProfile={this.props.saveProfile}
                    
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
