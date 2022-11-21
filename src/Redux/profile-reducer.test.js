import profileReducer, { addPostActionCreator, deletePostActionCreator } from './profile-reducer';

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 10 },
    { id: 2, message: 'It is my first post', likesCount: 201 },
    { id: 3, message: 'Yo', likesCount: 20 },
  ],
};
it('new post should be added to array', () => {
  //1. Исходные данные для тестирования
  let action = addPostActionCreator('it-kamasutra.com');

  //2. Делаем action
  let newState = profileReducer(state, action);

  //3. Проверяем соответсвие ожиданиям
  expect(newState.posts.length).toBe(5);
});

it('message of new post', () => {
  //1. Исходные данные для тестирования
  let action = addPostActionCreator('it-kamasutra.com');

  //2. Делаем action
  let newState = profileReducer(state, action);

  //3. Проверяем соответсвие ожиданиям
  expect(newState.posts[4].message).toBe('it-kamasutra.com');
});
