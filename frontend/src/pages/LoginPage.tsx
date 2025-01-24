import React, { useContext, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/appContext";

const LoginPage: React.FC = () => {
    const { state, actions } = useContext(AppContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    
    const loginUser = async () => {
        const response = await httpClient.post('//127.0.0.1:5000/token', {
            username,
            password,
        })

        if (response.status == 200) {
            console.log(response.data.access_token);
            console.log(username)
            sessionStorage.setItem("token", response.data.access_token);
            sessionStorage.setItem("username", username);
            actions.setToken(response.data.access_token);
            console.log("Token" + state.token);
            actions.setEmail(username);
            console.log("Username"+ state.username);
            navigate("/");
        } else if (response.status == 401) {
            console.log("login not working")
            console.log("invalid credentials");
        }
    };

    return (
        <div>
            <h1>Login To Your Account</h1>
            <form>
                <label>Username:</label>
                <input type="text"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
                <label>Password:</label>
                <input type="text"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button type="button" onClick={loginUser}>Submit</button>
            </form>
        </div>
    );
  
  
};

export default LoginPage;