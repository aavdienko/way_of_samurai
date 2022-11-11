import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {'API-KEY': "6b1abbdf-e45e-46cb-9b63-d9aa639ada5b"}
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
    return instance
      .post(`follow/${userID}`);
  },
  unfollow(userID) {
    return instance.delete(`follow/${userID}`);
  },
};

// export const authAPI = {
//   getAuth(){
//     return instance.get(`auth/me`)
//   }
// }
