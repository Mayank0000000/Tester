import { useState, useEffect } from 'react';
import './App.css';
import SurveyComponent from './Components/SurveyComponent';
import { Box, Heading } from '@chakra-ui/react';
import ImageGallery from './Components/ImageGallery';
import VideoGallery from './Components/VideoGallery';


function App() {
  const [surveyData, setSurveyData] = useState([]);
  

  const url = window.location.href
  
  const urlArray = url.split('');
  
  const taskId = urlArray.slice(-24).join(''); 
  

  const videoData = async() => {
    const response = await fetch(`http://localhost:3001/videos/get-video/${taskId}`)
    const data = await response.json();
    setSurveyData(data);
  }

  const imageData = async() => {
    const response = await fetch(`http://localhost:3001/api/get-images/${taskId}`)
    if(!response.ok) {
      videoData()
      return  
   
   }  
   const data = await response.json();
   setSurveyData(data);
  }

  const apiData = async () => {
    const response = await fetch(`http://localhost:3001/questions/${taskId}`)
    if(!response.ok) {
      imageData()
      return
    
    }   
    const data = await response.json();
    setSurveyData(data);
  };
 
  useEffect(() => {
    apiData();    
  }, []); 
  console.log(surveyData)

  return (
    <>
    <Box p={8} textAlign="center"  height='100vh'>
      <Heading as="h1" size="xl" mb={4} fontWeight="bold" color="teal.700">
        Tester View 
      </Heading>     
      {(surveyData[0]?.type === 'radio' || surveyData[0]?.type === 'checkbox' || surveyData[0]?.type === 'input') && <SurveyComponent surveyData={surveyData} taskId={taskId}/>}
      {surveyData?.survey_type === 'image' && <ImageGallery surveyData={surveyData} taskId={taskId}/>}
      {surveyData?.survey_type === 'video' && <VideoGallery surveyData={surveyData} taskId={taskId}/>}
    </Box>
    
    </>
  );
}

export default App;