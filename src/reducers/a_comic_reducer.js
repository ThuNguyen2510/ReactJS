var initialState =  [];
export default function comic(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_A_COMIC':
      return [action.comic,action.gen]  
    default:
      return [...state];
  }
}
