import React, { useContext } from 'react';
import { AppContext } from '../store/appContext';
import CreatePost from '../components/CreatePost';
import PostsDisplay from '../components/PostsDisplay';
import Navbar from '@/components/Navbar';
import ProfilePicture from '@/components/ProfilePicture';

const LandingPage: React.FC = () => {
    const { state, actions } = useContext(AppContext);

    const logout = () => {
        actions.logout();
    };

    return (
        <div>
            {state.token != null ? (
                <>
                    <CreatePost />
                    <PostsDisplay/>
                </>
            ) : (
            <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Welcome to echo!
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Log in or create an account to start sharing your thoughts.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="/login">
                            <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-all">
                                Login
                            </button>
                        </a>
                        <a href="/register">
                            <button className="bg-white text-green-500 font-bold py-3 px-8 rounded-lg border border-green-500 hover:bg-green-500 hover:text-white transition-all">
                                Register
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default LandingPage;
