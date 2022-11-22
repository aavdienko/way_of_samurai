import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../Assets//User.png';
import { NavLink, Navigate } from 'react-router-dom';

let User = ({user,...props}) => {
  return (
    <div>
          <span>
            <div>
              <NavLink to={'./../profile/' + user.id}>
                <img
                  src={
                    user.photos.small != null ? user.photos.small : userPhoto
                  }
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.unfollowThunk(user.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.followThunk(user.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{'user.location.city'}</div>
              <div>{'user.location.country'}</div>
            </span>
          </span>
        </div>
  );
}

export default User;
