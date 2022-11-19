import React from 'react';
import {
  setCurrentPage,
  setToggleFollowingProgress,
  getUsers,
  followThunk,
  unfollowThunk,
} from '../../Redux/users-reducers';
import Users from './Users';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { getCurrentPageSelector, getFollowingInProgressSelector, getIsAuthSelector, getIsFetchingSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersSelector } from '../../Redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          followThunk={this.props.followThunk}
          unfollowThunk={this.props.unfollowThunk}
          isAuth={this.props.isAuth}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//     isAuth: state.auth.isAuth
//   };
// }; закоментил для создания селекторов

let mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
    isAuth: getIsAuthSelector(state)
  };
};


export default compose(
  connect(mapStateToProps, {
    setCurrentPage,
    setToggleFollowingProgress,
    getUsers,
    followThunk,
    unfollowThunk,
  }),
  withAuthRedirect
)(UsersContainer);



// let MapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userID) => {
//       dispatch(followAC(userID));
//     },
//     unfollow: (userID) => {
//       dispatch(unfollowAC(userID));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount));
//     },
//     setToggleIsFetching: (isFetching) => {
//       dispatch(setToggleIsFetchingAC(isFetching))
//     }
//   };
// }; Заменили MDTP на передачу самих каллбэков в Usercontainer через коннект и пропс.

// let withRedirect = withAuthRedirect(UsersContainer)

// export default connect(mapStateToProps, {
//   setCurrentPage,
//   setToggleFollowingProgress,
//   getUsers,
//   followThunk,
//   unfollowThunk,
// })(withRedirect);

