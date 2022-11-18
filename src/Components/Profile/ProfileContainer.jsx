import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus} from '../../Redux/profile-reducer';
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
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>;
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

// alternate solution

// import React from 'react';
// import Profile from './Profile';
// import { connect } from 'react-redux';
// import {
//   getUserStatus,
//   getUserProfile,
//   updateUserStatus,
// } from '../../Redux/profile-reducer';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { compose } from 'redux';
// import { Navigate } from 'react-router-dom';

// class ProfileContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isShowMyProfile: true,
//     };
//   }

//   componentDidMount() {
//     let userIdFromPath = +this.props.router.params.userId;
//     let authorisedUserId = this.props.authorisedUserId;

//     if (userIdFromPath) {
//       //userId = 2;
//       //userId = 23275;
//       this.props.getUserProfile(userIdFromPath);
//       this.props.getUserStatus(userIdFromPath);
//     } else {
//       if (this.props.isAuth) {
//         this.props.getUserProfile(authorisedUserId);
//         this.props.getUserStatus(authorisedUserId);
//       }
//     }
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     let userIdFromPath = +this.props.router.params.userId;
//     let authorisedUserId = this.props.authorisedUserId;
//     let isShowMyProfile = this.state.isShowMyProfile;

//     if (isShowMyProfile) {
//       if (userIdFromPath === authorisedUserId) {
//         this.setState({ isShowMyProfile: false });
//       }

//       if (!userIdFromPath && this.props.isAuth) {
//         this.props.getUserProfile(authorisedUserId);
//         this.props.getUserStatus(authorisedUserId);
//         this.setState({ isShowMyProfile: false });
//       }
//     }
//   }

//   render() {
//     if (!this.props.isAuth && !this.props.router.params.userId) {
//       return <Navigate to={'/login'} />;
//     }

//     return (
//       <div>
//         <Profile
//           {...this.props}
//           profile={this.props.profile}
//           status={this.props.status}
//           updateStatus={this.props.updateStatus}
//         />
//       </div>
//     );
//   }
// }
// // wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     return <Component {...props} router={{ location, navigate, params }} />;
//   }
//   return ComponentWithRouterProp;
// }
// let mapStateToProps = (state) => ({
//   profile: state.profilePage.profile,
//   status: state.profilePage.status,
//   authorisedUserId: state.auth.id,
//   isAuth: state.auth.isAuth,
// });


// export default compose(
//   withRouter,
//   connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus })
// )(ProfileContainer);
