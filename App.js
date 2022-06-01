import React, {useReducer, useState} from 'react'
import {users, addNewPost} from './jsondata/Data'


var userDetailsContext = React.createContext(null)

const initialState = {
  usersData : {
    touched : true,
    valid : true,
    value : '',
    users : [],
    comments : '',
    validationRules : {}
  },
  addPost : {
    touched : true,
    valid : true,
    value : '',
    posts : [],
    comments : '',
    validationRules : {}
  }
}

const reducer = (state,action) => {
  switch(action.type) {
    case 'NEW_USER':
      return{
        ...state,
        usersData : {
          ...state.usersData,
          users : action.payload.users,
          value : action.payload.value
        }
      }
    case 'ADD_POST':
      return{
        ...state,
        addPost : {
          ...state.addPost,
          posts : action.payload
        }
      }
    case 'VALID_FALSE':
      return{
        ...state,
        addPost : {
          ...state.addPost,
          valid : action.payload
        },
        usersData : {
          ...state.usersData,
          valid : action.payload
        }
      }
    default :
      throw new Error();
  }
}


function App(){
  
  const[state, dispatch] = useReducer(reducer, initialState);
  var [userDetails] = useState({
    name : "Nikhil",
    age : 24  
  });
  const addComment = () => {
    console.log("comments",users);
    let tmpusers = []
    users.map((item)=>{
      let tempuser = {};
      tempuser.id = item.id;
      tempuser.value = item.name;
      tmpusers.push(tempuser)
    })
    dispatch({
      type : 'NEW_USER',
      payload : {
        value : tmpusers[0].value,
        users : tmpusers
      }
    })
  }

  const addPost = () => {
    dispatch({
      type : "ADD_POST",
      payload : addNewPost
    })
  }

  const validFalse = () => {
    dispatch({
      type : "VALID_FALSE",
      payload : false
    })
  }

  const onSubmit = () => {
    const isValid = state.usersData.valid && state.usersData.valid;
    if(isValid){
      console.log("valid",isValid);
    }
    else{
      console.log("not valid",isValid);
    }
  }


  return (
    <userDetailsContext.Provider value={userDetails}>
      <center>
        <button onClick={()=>addComment()}>Add Comment</button>
        <button onClick={()=>addPost()}>Add Post</button>
        <button onClick={()=>validFalse()}>Valid false</button>
        <button onClick={()=>onSubmit()}>Submit</button>
        <ChildComponent />
      </center>
    </userDetailsContext.Provider>
  )
}
export default App

export const ChildComponent = () => {
  var contextData = React.useContext(userDetailsContext);
  console.log("context data",contextData)
  return(
    <div>
      <h3>this is childComponent</h3>
    </div>
  )
}