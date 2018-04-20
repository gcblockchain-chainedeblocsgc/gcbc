import fetch from 'cross-fetch';
const GET_STATUS = 'rta/setStatus/GET_STATUS';
const GET_STATUS_SUCCESS = 'rta/setStatus/GET_STATUS_SUCCESS';
const GET_STATUS_FAILURE = 'rta/setStatus/GET_STATUS_FAILURE';

export const requestStatus = () => ({ type: GET_STATUS });
export const receiveStatus = status => ({ type: GET_STATUS_SUCCESS, status });
export const receiveStatusFail = error => ({ type: GET_STATUS_FAILURE, error });

export const fetchStatus = () => (dispatch) => {
  dispatch(requestStatus());
  
  return fetch('/api/character/0x678a3db10c89286ea88e0ed4532ecdf5af332264').then(
    res => res.json(),
    error => dispatch(receiveStatusFail(error))
  )
    .then(status => dispatch(receiveStatus([status])))
  
}

const initialState = {
  status: "",
  isFetching: false,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_STATUS:
      return {
        ...state,
        isFetching: true
      };
    case GET_STATUS_SUCCESS:
      return {
        ...state,
        status: action.status,
        isFetching: false
      };
    case GET_STATUS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};
