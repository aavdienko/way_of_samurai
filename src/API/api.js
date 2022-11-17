import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  follow(userID) {
    return instance.post(
      `follow/${userID}`,
    )
  },
  unfollow(userID) {
    return instance.delete(`follow/${userID}`);
  },
  getProfile(userID){
      // instance.get(`profile/${userID}`)
    console.warn('Obsolete method. Please use profileAPI object')
    return profileAPI.getProfile(userID)
  }
};

export const profileAPI = {

  getProfile(userID){
    return instance.get(`profile/${userID}`)
  },
  getStatus(userID){
    return instance.get(`profile/status/${userID}`)
  },
  updateStatus(status){
    return instance.put(`profile/status`, {status: status})

  }

};

export const authAPI = {
  me(){
    return instance.get(`auth/me`)
  }
}

// export const loginAPI = {
//   login() {
//     return instance.put(`auth/login`)
//   }

// }