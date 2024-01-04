import React, { useState } from 'react';
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import ResponseMessage from './ResponseMessage';

const ImageGallery = (props) => {
  const [preferredImages, setPreferredImages] = useState([])
  const [responseMessage, setResponseMessage] = useState(true);



  const url = (data) => {
    setPreferredImages(prev => [...prev, data])
  }
  console.log(props.taskId)

  const handleSurveySubmit = () => {
    const body = {
      surveyId: props.taskId,
      response: preferredImages,
    }

    axios
      .post('http://localhost:3001/image-test/add-testImages', body)
      .then((response) => console.log('Response submitted'))
      .catch((error) => console.error(error));
      setResponseMessage(false);
  }

  return (
    <>
      {responseMessage && <div>

        <Text>Select your preferred image/images</Text>
        <Flex justify="center" align="center" wrap="wrap">


          {props.surveyData.images?.map((image, index) => (
            <Box key={index} m={2} p={4} boxShadow="md" borderRadius="md" overflow="hidden">
              <Image src={image} alt={`Image ${index + 1}`} boxSize="200px" objectFit="cover" onClick={() => url(image)} />
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
