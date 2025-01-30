// PostForm.tsx
import React, { useState, useContext } from 'react';
import { Post } from './types';
import { Box, Button, Input, Textarea, Avatar, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { AppContext } from '../store/appContext';
import httpClient from '../httpClient';
import ProfilePicture from './ProfilePicture';


const CreatePost: React.FC = () => {
  // State to hold the form data
  const { state, actions } = useContext(AppContext);
  const [content, setContent] = useState<string>('');
  const [media, setMedia] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle input changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Handle media file selection
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setMedia(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submission (Just logging the post data for now)
  const handleSubmit = async () => {

    // Basic validation
    if (!content) {
      setError('Content is required');
      return;
    }

    // Retrieve username and token from context
    const username = actions.getUsername();
    const token = actions.getToken();

    if (!username || !token) {
      setError('You must be logged in to create a post.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('content', content);
    formData.append('username', username);
    if (media) formData.append('media', media);

    try {
      // Send the post data to the API
      const response = await httpClient.post('http://127.0.0.1:5000/create_post', formData, {
        headers: {
            "Authorization": "Bearer " + state.token,
            "Content-Type": "multipart/form-data",
        },
        });

      console.log('Post created:', response.data);

      // Reset the form
      setContent('');
      setMedia(null);
      setError('');
    } catch (error: any) {
      setError('Failed to create post. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <VStack align="stretch">
        {/* Header with profile picture */}
        <HStack>
          <ProfilePicture username={"test1"} />
          <Text fontSize="lg" fontWeight="bold">
            {actions.getUsername()}
          </Text>
        </HStack>

        {/* Error message */}
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}

        {/* Content input */}
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          size="lg"
        />

        {/* Media upload */}
        <Input
          type="file"
          accept="image/*"
          onChange={handleMediaChange}
          size="sm"
        />

        {/* Image preview */}
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            borderRadius="md"
            objectFit="cover"
            maxW="100%"
          />
        )}

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          width="full"
          size="lg"
        >
          Create Post
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePost;