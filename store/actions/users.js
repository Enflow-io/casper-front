import {get} from "../../api"

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

const getUsersStart = () => ({
  type: GET_USERS_START
});

const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: data
});

const getUsersFailed = (error) => ({
  type: GET_USERS_FAILED,
  payload: error
});

export const getUsers = () => async (dispatch) => {
  dispatch(getUsersStart());
  const result = await get('/user');
  try {
    dispatch(getUsersSuccess(result.data));
  } catch (e) {
    dispatch(getUsersFailed(e));
  }
};
