import React, {useContext, useState, useEffect} from "react";
// import { useGoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css';
import homeimg from "../Images/Home.png";
import left from "../Images/Left.png";
import right from "../Images/Right.png";
import AuthContext from "../../AuthContext";
import jwt_decode from "jwt-decode";


function Login() {

    const CLIENT_ID = "762997472592-abdm0ct1g1ufrnupf7f7om2k5qsqc5ku.apps.googleusercontent.com";

    const SCOPES = "email profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.announcements"

    const { setUser,  userData, setUserData } = useContext(AuthContext);
    const [tokenClient, setTokenClient] = useState({});

    function login(){
        tokenClient.requestAccessToken();
    }

    function handleCallbackResponse(response){
        //console.log("JWT ID Token: "+response.credential); 
        var UserObject = jwt_decode(response.credential);
        console.log(UserObject);
        console.log(UserObject.email);
        setUser(UserObject);
        setUserData({
            credential: response.credential,
        });
        document.getElementById("signIn").hidden = true;
    }

    useEffect(() => {
        const google = window.google;
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signIn"),
            {theme: "outline", size: "large", shape:"circle"} 
        );
        setTokenClient(
            google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (tokenResponse) => {
                    //console.log(tokenResponse)
                    setUserData({
                        token: tokenResponse.access_token,
                        loader: 0,
                    });
                }
            })
        );
    }, []);

    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => {
    //         console.log(tokenResponse);
    //         console.log(tokenResponse.access_token)
    //         setUserData({
    //             token: tokenResponse.access_token,
    //             loader: 0,
    //         });

    //     },
    //     onError:  (response) => {
    //         console.log("Login failed: res:", response);
    //     },

    //     scope: SCOPES,

    // });


    return (
        <div id={styles.login}>
            <div className={styles.left}>
                <img src={left} alt="Left Wave" />
            </div>
            <div className={styles.container1}>
                <div className={styles.row1}>
                    <div className={styles.homeimg}>
                        <img src={homeimg} alt="Peer Learning" />
                    </div>
                    <div className={styles.col-2}>
                        <h1 className={styles.title}>Peer Learning Platform</h1>
                        <h3 className={styles.description}>A platform specifically designed as an addition to Google Classroom for students to gain the best out of online education, look at solutions not just from their but also from the perspectives of their peers.</h3>
                        <h3 className={styles.description}>A platform that not only promotes education but also instills moral integrity within it’s community.</h3>
                        {/* <button id="button1" onClick={login}>Sign In with Google</button> */}

                        <div className={styles.SignInButton}>
                            <div id="signIn"></div>
                            {userData.credential ? 
                            <>
                                <button onClick={login}>Access Token</button>
                            </> 
                        : null}
                        </div>

                        {/* {userData.credential ? 
                            <>
                                <div className={styles.SignInButton2}><button onClick={login}>Access Token</button></div>
                            </> 
                        : null} */}
                        

                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <img src={right} alt="Right Wave"/>
            </div>
        </div>
    );
}

export default Login;
