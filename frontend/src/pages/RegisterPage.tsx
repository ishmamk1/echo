import React, { useContext, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/appContext";

const RegisterPage: React.FC = () => {
    const { state, actions } = useContext(AppContext);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    
    const registerUser = async () => {
        const response = await httpClient.post('//127.0.0.1:5000/register', {
            username,
            email,
            password,
        })

        if (response.status == 200) {
            console.log(response.data.access_token);
            console.log(email)
            sessionStorage.setItem("token", response.data.access_token);
            sessionStorage.setItem("email", email)
            actions.setToken(response.data.access_token);
            console.log("Token" + state.token);
            actions.setEmail(email);
            console.log("Email"+ state.email);
            navigate("/");
        } else if (response.status == 401) {
            console.log("Register not working")
            console.log("invalid credentials");
        }
    };

    return (
        <div>
            <h1>Register To Your Account</h1>
            <form>
                <label>Username:</label>
                    <input type="text"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}>
                </input>
                <label>Email:</label>
                <input type="text"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}>
                </input>
                <label>Password:</label>
                <input type="text"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button type="button" onClick={registerUser}>Register</button>
            </form>
        </div>
    );
  
  
};

export default RegisterPage;