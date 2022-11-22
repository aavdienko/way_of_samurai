import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../Assets//User.png';
import { NavLink, Navigate } from 'react-router-dom';
import Paginator from '../Common/Paginator/Paginator';


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged,...props}) => {

  return (
    <div>
    <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} />
      {props.users.map((users) => (
        <div key={users.id}>
          <span>
            <div>
              <NavLink to={'./../profile/' + users.id}>
                <img
                  src={
                    users.photos.small != null ? users.photos.small : userPhoto
                  }
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {users.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === users.id
                  )}
                  onClick={() => {
                    props.unfollowThunk(users.id)}}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === users.id
                  )}
                  onClick={() => {
                    props.followThunk(users.id)
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{users.name}</div>
              <div>{users.status}</div>
            </span>
            <span>
              <div>{'users.location.city'}</div>
              <div>{'users.location.country'}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
