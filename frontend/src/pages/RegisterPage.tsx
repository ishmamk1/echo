import React, { useContext, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/appContext";

import { Box, Button, Input, Stack, Heading } from "@chakra-ui/react";

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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
            <Box bg="white" p={8} rounded="lg" shadow="lg" width="full" maxWidth="sm">
                <Heading size="lg" textAlign="center" mb={6}>
                    Register To Your Account
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
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                        onClick={registerUser}
                        colorScheme="blue"
                        size="lg"
                    >
                        Register
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
  
  
};

export default RegisterPage;