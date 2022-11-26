import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';

let Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  ...props
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {props.users.map((users) => (
          <User
            user={users}
            followingInProgress={props.followingInProgress}
            key={users.id}
            followThunk={props.followThunk}
            unfollowThunk={props.unfollowThunk}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
