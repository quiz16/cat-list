import AlertReducer from './alert';

export default ({
  alert,
}, action) => ({
  alert: AlertReducer(alert, action),
});
