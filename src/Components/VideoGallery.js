import React, { useState } from 'react';
import {
  Box,
  Center,
  ChakraProvider,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import ResponseMessage from './ResponseMessage';
import axios from 'axios';
import { BASE_URL as baseurl } from './Constants/Constants';
import './VideoGallery.css'

const VideoGallery = (props) => {
  const videoUrl = props.surveyData.videos[0];
  const [responseMessage, setResponseMessage] = useState(true);
  const toast = useToast();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  const handleSubmit = () => {
    if (startTime.trim() === '' || endTime.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please enter both start and end times.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const startInt = parseInt(startTime, 10);
    const endInt = parseInt(endTime, 10);
    if (isNaN(startInt) || isNaN(endInt) || startInt >= endInt) {
      toast({
        title: 'Error',
        description: 'Please enter valid integer values for start and end times.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const body = {
      surveyId: props.surveyData._id,
      response: props.surveyData.videos[0],
      start_time: startTime,
      end_time: endTime

    }    
    axios
      .post(`${baseurl}/video-test/test-videos`, body)
      .then((response) => console.log('Response submitted'))
      .catch((error) => console.error(error));
    setResponseMessage(false);
  }

  return (
    <>
      {responseMessage && <ChakraProvider>
        <Box className='video-container' boxShadow="lg" >
          <VStack className='video-flex'>
            <Heading fontSize="xl" mb={4}>
              Video Gallery
            </Heading>
            <Center>
              <Box className='react-player'>
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  style={{ borderRadius: '8px' }}
                />
              </Box>
            </Center>
            <Text fontSize="sm" color="gray.500">
              Watch the video and enjoy!
            </Text>
            <VStack className='time-container'>
              <Input
                placeholder="Start Time (e.g., 1)"
                value={startTime}
                onChange={handleStartTimeChange}
              />
              <Input
                placeholder="End Time (e.g., 3)"
                value={endTime}
                onChange={handleEndTimeChange}
              />
              <Button colorScheme="teal" onClick={handleSubmit}>
                Submit
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ChakraProvider>}
      {!responseMessage && <ResponseMessage />}
    </>
  );
};

export default VideoGallery;
