import axios from 'axios';
import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../Assets//User.png'

class UsersAPIComponent extends React.Component {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
    .then(response => {
      this.props.setUsers(response.data.items)
      this.props.setTotalUsersCount(response.data.totalCount)
    })
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
    .then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  render() {

    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

    let pages = []
    for (let i = 1; i<= pagesCount; i++){
      pages.push(i)
    }

    return (
      <div>
        <div>
          {pages.map((page) => {
            return <span className={this.props.currentPage === page && styles.selectedPage} onClick={(event) => {
              this.onPageChanged(page)
            }}>{page}</span>
          })}
        </div>
        {this.props.users.map((users) => (
          <div key={users.id}>
            <span>
              <div>
                <img src={users.photos.small != null ? users.photos.small : userPhoto} className={styles.userPhoto} />
              </div>
              <div>
                {users.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(users.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(users.id);
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
  }
}

export default UsersAPIComponent;
