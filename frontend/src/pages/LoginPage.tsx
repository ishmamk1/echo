import React, { useContext, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/appContext";

import { Box, Button, Input, Stack, Heading } from "@chakra-ui/react";


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
            actions.setUsername(username);
            console.log("Username"+ state.username);
            navigate("/");
        } else if (response.status == 401) {
            console.log("login not working")
            console.log("invalid credentials");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
            <Box bg="white" p={8} rounded="lg" shadow="lg" width="full" maxWidth="sm">
                <Heading size="lg" textAlign="center" mb={6}>
                    Login To Your Account
                </Heading>
                <Stack>
                    <Box>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            mb={4}
                        />
                    </Box>
                    <Box>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            mb={6}
                        />
                    </Box>
                    <Button
                        width="full"
                        onClick={loginUser}
                        colorScheme="blue"
                        size="lg"
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default LoginPage;