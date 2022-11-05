import React from 'react';
import {
  follow,
  setCurrentPage,
  setUsers,
  unfollow,
  setTotalUsersCount,
  setToggleIsFetching,
  setToggleFollowingProgress
} from '../../Redux/users-reducers';
import Users from './Users';
import { connect } from 'react-redux';
import axios from 'axios';
import Preloader from '../Common/Preloader/Preloader';
import { usersAPI } from '../../API/api.js';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.setToggleIsFetching(true);

    usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
      this.props.setToggleIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUsersCount(data.totalCount);
    });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setToggleIsFetching(true);

    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.setToggleIsFetching(false);
      this.props.setUsers(data.items);
    });
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
          setToggleFollowingProgress={this.props.setToggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  };
};

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

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setToggleIsFetching,
  setToggleFollowingProgress,
})(UsersContainer);
