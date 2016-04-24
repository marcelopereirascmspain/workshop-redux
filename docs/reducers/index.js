function reducer(state = '', action) {
  switch (action.type) {
    case CHANGE_TEXT:
      return action.payload;
    default:
      return state;
  }
}