export default function user(state = {}, action) {
  switch (action.type) {
    case 'setUserInfo':
      return {
        ...state,
        userInfo: action.userInfo
      };
    default:
      return state;
  }
}
