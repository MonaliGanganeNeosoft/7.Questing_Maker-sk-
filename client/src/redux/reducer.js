
import store from "./store";
import getData from "./thunkmiddleware";
const initialState = { allque:[] ,login:''};

function reducer(state = initialState, actions) {
  // let email=""
  // const user = JSON.parse(localStorage.getItem("user"));
  // if(user){
  //    email = user.email;

  // }
  switch (actions.type) {
      //  case 'GET_DATA': return { ...state,allque:actions.payload}
      //  case 'GET_DATA_FUNC_CALL': {store.dispatch(getData(email))}
       case 'isuser':
        if (localStorage.getItem('user'))
            return { ...state,login:true}
        else {
            return { ...state,login:false}
        }
    default:
      return state;
  }
}

export default reducer;
