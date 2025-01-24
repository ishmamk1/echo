import React, { useState, useEffect, useContext } from "react";
import httpClient from "../httpClient";
import { AppContext } from "../store/appContext";

const LandingPage: React.FC = () => {
    const { state, actions } = useContext(AppContext);
    const [message, setMessage] = useState<string>("Loading...");

    const logout = () => {
        actions.logout();
    }

    const fetchMessage = async () => {
          const fetchedMessage = await actions.getMessage();
          console.log(fetchMessage);
          setMessage(fetchedMessage); // Set the message once it's fetched
    };

    useEffect(() => {
        if (state.token) {
          fetchMessage();
        } else {
          setMessage("You are not logged in."); // Reset the message if the user logs out
        }
    }, [state.token]);


    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {state.token != null ? (
                <>
                    <h1>{state.token}</h1>
                    <button onClick={logout}>Logout</button>
                    <h1>{message}</h1>
                </>
            ) : (
                <div>
                    <p>You are not logged in.</p>
                    <a href="/login"><button>Login</button></a>
                    <a href="/register"><button>Register</button></a>
                </div>
            )}
        </div>
    );
};

export default LandingPage;