import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { initializeApp } from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { userContext } from '../../App';
import LayOut from '../../Shared/LayOut/LayOut';

const app = initializeApp(firebaseConfig);

const usestyles = makeStyles({
    root: {
        margin: '100px 0'
    }
})

const LogIn = () => {
    const classes = usestyles()
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });
    const [logedInUser, setLogedInUser] = useContext(userContext)
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    // handle form submit
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log(user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(user)
                });
        }

        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLogedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

        // handle form validation
        const handleBlur = e => {
            let isFieldValid = true;
            if (e.target.name === 'email') {
                isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            }
            if (e.target.name === 'password') {
                const isPasswordValid = e.target.value.length > 6;
                const passwordHasNumber = /\d{1}/.test(e.target.value);
                isFieldValid = isPasswordValid && passwordHasNumber;
            }
            if (isFieldValid) {
                const newUserInfo = { ...user };
                newUserInfo[e.target.name] = e.target.value;
                setUser(newUserInfo);
            }
        }



    const handlegoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user
                const newUserInfo = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLogedInUser(newUserInfo)
                history.replace(from);
            }).catch((error) => {
                console.log(error.message)
            });
    }

    const handlegoogleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            const logOutInfo = {
                name: '',
                email: '',
                photo: ''
            }
            setLogedInUser(logOutInfo)
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <LayOut>
            <div className={classes.root}>
                <input className="form-check-input" type="checkbox" name="checkbok" onChange={() => setNewUser(!newUser)} />
                <label className="form-check-label" htmlFor="newUser">New User Sing Up</label>
                <form onSubmit={handleSubmit}>
                    {newUser && <input className='form-control' name='name' onBlur={handleBlur} type="text" placeholder='User Name' required />}<br />
                    <input className='form-control' name='email' onBlur={handleBlur} type="text" placeholder='Your Email' required /><br />
                    <input className='form-control' name='password' onBlur={handleBlur} type="password" placeholder='Your Password' required /><br />
                    <input className='btn btn-outline-success' type="submit" value={newUser ? 'Sing Up' : 'Sing In'} />
                </form>
                {
                    user.success ?
                        <p className='text-success'>User {newUser ? 'Created' : 'Loged In'} Successfully.</p>
                        :
                        <p className='text-danger'>{user.error}</p>
                }
                {
                    logedInUser.email ? <button onClick={handlegoogleSignOut}>Sign Out From Google</button> : <button className='btn button' onClick={handlegoogleSignIn}>sign in with google</button>
                }
            </div>
        </LayOut>
    );
};

export default LogIn;