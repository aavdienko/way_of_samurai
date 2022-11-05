import axios from 'axios';
import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../Assets//User.png'

let Users = (props) => {
  let getUsers = () => {
    if (props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users')
      .then(response => {
        props.setUsers(response.data.items)
      })
  }
    // props.setUsers([
    //   {
    //     id: 1,
    //     followed: false,
    //     photoUrl:
    //       'data:image/jpeg;base64,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',
    //     fullName: 'Alex',
    //     status: 'Papochka',
    //     location: {
    //       city: 'UKa',
    //       country: 'KZ',
    //     },
    //   },
    //   {
    //     id: 2,
    //     photoUrl:
    //       'data:image/jpeg;base64,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',
    //     followed: false,
    //     fullName: 'Lera',
    //     status: 'Mamochka',
    //     location: {
    //       city: 'UKa',
    //       country: 'KZ',
    //     },
    //   },
    //   {
    //     id: 3,
    //     photoUrl:
    //       'data:image/jpeg;base64,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',
    //     fullName: 'Crosby',
    //     status: 'miniPig',
    //     location: {
    //       city: 'Prague',
    //       country: 'CZ',
    //     },
    //   },
    //   {
    //     id: 4,
    //     photoUrl:
    //       'data:image/jpeg;base64,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',
    //     followed: true,
    //     fullName: 'Schoko',
    //     status: 'Krasavica',
    //     location: {
    //       city: 'Prague',
    //       country: 'CZ',
    //     },
    //   },
    // ]);
  }

  return (
    <div>
      <button onClick={getUsers}>Get Users</button>
      {props.users.map((users) => (
        <div key={users.id}>
          <span>
            <div>
              <img src={users.photos.small != null ? users.photos.small : userPhoto} className={styles.userPhoto} />
            </div>
            <div>
              {users.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(users.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(users.id);
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
              <div>{"users.location.city"}</div>
              <div>{"users.location.country"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;