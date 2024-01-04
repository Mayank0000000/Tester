import React, { useState } from 'react';
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import ResponseMessage from './ResponseMessage';
import { BASE_URL as baseurl } from './Constants/Constants';
import './ImageGallery.css'

const ImageGallery = (props) => {
  const [preferredImages, setPreferredImages] = useState([])
  const [responseMessage, setResponseMessage] = useState(true);

  const url = (data) => {
    setPreferredImages(prev => [...prev, data])
  }

  const handleSurveySubmit = () => {
    const body = {
      surveyId: props.taskId,
      response: preferredImages,
    }

    axios
      .post(`${baseurl}/image-test/add-testImages`, body)
      .then((response) => console.log('Response submitted'))
      .catch((error) => console.error(error));
    setResponseMessage(false);
  }

  return (
    <>
      {responseMessage && <div>
        <Text>Select your preferred image/images</Text>
        <Flex className='image-gallery-container'>
          {props.surveyData.images?.map((image, index) => (
            <Box key={index} className='image-data-box' boxShadow="md" >
              <Image src={image} alt={`Image ${index + 1}`} className='image-image' boxSize="200px" onClick={() => url(image)} />
            </Box>
          ))}
        </Flex>
        <Button onClick={handleSurveySubmit}>Submit</Button>
      </div>}
      {!responseMessage && <ResponseMessage />}
    </>
  );
};

export default ImageGallery;
