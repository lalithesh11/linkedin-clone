import React, { useState } from 'react';
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    // useDispatch() is a react-redux hook for dispatching the actions
    const dispatch=useDispatch();

    const loginToApp = (e) => {
        console.log("Inside loginToApp function");
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then((userAuth)=>{
            dispatch(login({
                email:userAuth.user.email,
                uid:userAuth.user.uid,
                displayName:userAuth.user.displayName,
                photoUrl:userAuth.user.photoURL,
            })
            );
        }).catch((error)=>alert(error));

    }

    const register = () => {
        console.log("Inside register function");
        if(!name){
            return alert("Please enter a full name");
        }

        // we are passing the email & password as parameters and the auth function will create a user at backend.
        auth.createUserWithEmailAndPassword(email,password)
        // if the user created then we can update the user details like profilePic, name , password..
        .then((userAuth)=>{
            userAuth.user.updateProfile({
                // displayName, photoURL are the keys reffered to firebase, we should not change that
                displayName:name,
                photoURL:profilePic,
            })
            // Now we are pushing the user data to the reduxstore/userSlice.Actually we are dispatching the actions 
            .then(()=>{
               dispatch(login({
                    // we are taking this data from the firebase
                    email:userAuth.user.email,
                    uid:userAuth.user.uid,
                    displayName:name,
                    photoUrl:profilePic
               }))
            })
        }).catch((error)=>alert(error))
     }

    return (
        <div className="login">
            {/* <h1>You are not logged in</h1> */}
            <img src="Images/linkedin_login.jpg" alt=""></img>
            <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name(required if registering)" type="text"></input>

                <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile pic URL(optional)" type="text"></input>

                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email"></input>

                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"></input>

                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>Not a member?{" "}
                <span className="login__register" onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login
