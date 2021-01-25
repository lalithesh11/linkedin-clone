import React, { useState, useEffect } from 'react';
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import InputOption from './InputOption';
import Post from './Post';
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";


function Feed() {

    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const user=useSelector(selectUser);

    // if we dont use orderBy, the posts will be kept in a random order.
    useEffect(() => {
        // onSnapshot is like a listener, where it will listen to the firestore in realtime in case of any addition/deletion/updation of the collection,it will give us a snapshot.
        db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot => (
            // .docs(documents) means will be having the many docs inside the collection and map through the docs and for every single doc inside of that collection, we are going to return an object.

            setPosts(snapshot.docs.map(doc => (
                {
                    //   for every doc, we will have an id and doc.data() will the data of that doc.
                    id: doc.id,
                    data: doc.data()
                }

            )))
        ))
    }, [])


    const sendPost = e => {
        e.preventDefault();
        console.log("posted");

        // When user send post, we are going to store that in DB.
        /*Initial development
        db.collection('posts').add({
            name: "Lalithesh Akula",
            description: "This is a test",
            message: input,
            photoUrl: "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        */

        // Adding/pushing  to db
        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        setInput(" ");
    }


    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write Article" color="#7FC15E" />
                </div>
            </div>

            {/*Posts  */}
            {/* destructuring the posts, so we have fields id & data. And we have destrcutured the data as well. */}
            <FlipMove>
            {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                <Post
                    // if we dont provide key, react will render everything in that list. In case, if we provide key, it will render only the new data added in that list.
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                />
            ))}
            </FlipMove>


            {/* <Post name="Lalithesh Akula" description="This is Test" message="Wow! this worked"/> */}

        </div>
    )
}

export default Feed
