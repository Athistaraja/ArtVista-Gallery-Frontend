import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectAuthToken = createSelector(
  [selectAuth],
  (auth) => auth ? auth.token : null
);

export const selectAuthRole = createSelector(
  [selectAuth],
  (auth) => auth ? auth.role : null
);
