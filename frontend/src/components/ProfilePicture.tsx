import React, { useEffect, useState } from 'react';
import httpClient from '@/httpClient';

// Define the Post type
interface Props {
  username: string;
}

const ProfilePicture: React.FC<Props> = ({ username }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await httpClient.post("http://127.0.0.1:5000/get_profile", { username });
        const users = response.data;
    
        // Find the user by username
        const user = users.find((user: any) => user.username === username);
    
        if (user && user.profile_picture) {
          setProfilePicture(`data:image/jpeg;base64,${user.profile_picture}`);
        } else {
          setProfilePicture(null); // No picture available
        }
      } catch (error) {
        console.error("Failed to fetch user image:", error);
      }
    };
    
    fetchUserImage();
  }, [username]);

  return (
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: "50%",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={`${username}'s Profile`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>No Image</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
