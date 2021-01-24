import Constants from 'constants';

export default (state, action) => {
  switch (action.type) {
    case Constants.TOGGLE_ALERT:
      return action.payload;
    default:
      return state;
  }
};
