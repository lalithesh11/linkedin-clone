import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from "./Feed";
import {useDispatch, useSelector} from "react-redux";
import { login, logout, selectUser } from './features/userSlice';
import Login from "./Login";
import { auth } from './firebase';
import Widgets from "./Widgets";

function App() {

  // useSelector is a hook from React-Redux
  const user = useSelector(selectUser);
  const dispatch=useDispatch();

useEffect(()=>{
  auth.onAuthStateChanged((userAuth)=>{
    if(userAuth){
      // user logged in
      dispatch(login({
        // we are taking this data from the firebase
        email:userAuth.email,
        uid:userAuth.uid,
        displayName:userAuth.displayName,
        photoUrl:userAuth.photoURL
   }))
  }
  else{
      //  user logged out
      dispatch(logout());
  }
  })
})

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* if no user/user not logged in render the login page else show the remaning app(means user logged in) */}
      {!user ?
        (<Login />) : (
          <div className="app__body">
            <Sidebar />
            <Feed />

           <Widgets />

          </div>
        )}

    </div>
  );
}

export default App;
