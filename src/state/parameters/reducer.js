import { combineReducers } from 'redux';
import { INITIAL_USER_STATE, INITIAL_OTHER_STATE, actionTypes } from './constants';

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_INCOME:
      return {
        ...state,
        income: action.payload,
      };
    case actionTypes.UPDATE_USER_UNIT_SIZE:
      return {
        ...state,
        unitSize: {
          label: action.payload.label,
          value: action.payload.value,
        },
      };
    default:
      return state;
  }
};

const other = (state = INITIAL_OTHER_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_OTHER_DEMOGRAPHIC:
      return {
        ...state,
        demographic: {
          label: action.payload.label,
          value: action.payload.value,
        },
      };
    case actionTypes.UPDATE_OTHER_UNIT_SIZE:
      return {
        ...state,
        unitSize: {
          label: action.payload.label,
          value: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default combineReducers({ user, other });
