import React, { createContext, useState, useContext } from "react";

export interface AppState {
    token: string | null;
    email: string | null;
    username:string | null;
}

interface AppContextType {
	state: AppState;
	actions: {
	setToken: (token: string) => void;
    setUsername: (username: string) => void;
	setEmail: (email: string) => void;
	logout: () => void;
	getMessage: () => Promise<string>;
	};
}

const defaultContextValue: AppContextType = {
	state: { token: null, email: null, username: null},
	actions: {
		setToken: () => {},
        setUsername: () => {},
		setEmail: () => {},
		logout: () => {},
		getMessage: async () => {
            return "blank"; // Just return an empty object here for default, can be overridden
        },
	},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);