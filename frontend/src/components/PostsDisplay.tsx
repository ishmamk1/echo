import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Box,
    Text,
    Image,
    Flex,
    Badge,
    Spinner,
    Stack,
    IconButton,
    useBreakpointValue,
    Icon,
  } from '@chakra-ui/react';
import ProfilePicture from './ProfilePicture';

// Define the Post type
interface Post {
  username: string;
  comments: string;
  content: string;
  created: string;
  id: number;
  likes: string;
  media?: string; // Media is optional
}

const PostsDisplay: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
  
    useEffect(() => {
      // Fetch posts from the API
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/all_posts');
          setPosts(response.data);
        } catch (err) {
          setError('Error fetching the posts');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);
  
    if (loading) return <Spinner size="xl" color="teal.500" />;
    if (error) return <Text color="red.500">{error}</Text>;
    if (!posts.length) return <Text color="gray.500">No posts available</Text>;
  
    return (
        <Stack>
          {posts.map((post) => (
            <Box
              key={post.id}
              maxW="xl"
              mx="auto"
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              bg="white"
            >
              {/* Post Content */}
              <ProfilePicture username={post.username}/>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {post.username}
              </Text>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {post.content}
              </Text>
    
              {/* Media (image or video) */}
              {post.media && (
                <Image
                  src={`data:image/jpeg;base64,${post.media}`}
                  alt={`Post ${post.id}`}
                  borderRadius="md"
                  mb={4}
                />
              )}
    
              {/* Post Metadata */}
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="sm" color="gray.500">
                  {new Date(post.created).toLocaleString()}
                </Text>
    
                <Flex>
                  {/* Likes */}
                  <Flex align="center" mr={4}>
                    <IconButton
                      aria-label="Like" // Use Chakra UI Icon component
                      size="sm"
                      color="teal.500"
                    />
                    <Text ml={2} fontSize="sm" color="gray.600">
                      {JSON.parse(post.likes).length}
                    </Text>
                  </Flex>
    
                  {/* Comments */}
                  <Flex align="center">
                    <IconButton
                      aria-label="Comment" // Use Chakra UI Icon component
                      size="sm"
                      color="teal.500"
                    />
                    <Text ml={2} fontSize="sm" color="gray.600">
                      {JSON.parse(post.comments).length}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
    
              {/* Post Badge */}
              <Badge colorScheme="teal" variant="subtle">
                {post.comments.length} Comments
              </Badge>
            </Box>
          ))}
        </Stack>
      );
    };
    
    export default PostsDisplay;