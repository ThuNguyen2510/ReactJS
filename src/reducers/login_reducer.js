import axios from 'axios';
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    
    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}
export function logout(){
  return dispatch=>{
    dispatch(log_out(false));
  }
}
function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
    
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}
function log_out(isLoginSuccess)
{
  return {
    type: 'LOG_OUT',
    isLoginSuccess
  }
}
function callLoginApi(username, password, callback) {
    
   console.log(username+""+password)
    axios.get('http://127.0.0.1:3000/users?username='+username )
    .then(
        data =>
      {         
          const user=data.data;
          console.log(data.data)
            setTimeout(() => {
                if (password === user[0].password) {
                  localStorage.clear()
                  localStorage.setItem('logined_user', JSON.stringify(user[0]))
                return callback(null);
                } else {
                return callback(new Error('Invalid email and password'));
                }
            }, 1000);
      }
    )

}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });
    case 'LOG_OUT':
        return Object.assign({}, state, {
          isLoginSuccess: action.isLoginSuccess
        });   
    default:
      return state;
  }
}