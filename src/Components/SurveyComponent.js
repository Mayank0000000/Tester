import React, { useState } from 'react';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import InputQuestion from './InputQuestion';
import { Stack, Button } from '@chakra-ui/react';
import axios from 'axios';
import ResponseMessage from './ResponseMessage';
import { BASE_URL as baseurl } from './Constants/Constants';

const SurveyComponent = (props) => {
  const [answers, setAnswers] = useState(Array(props.surveyData.length).fill({ question: '', answer: '', type: '' }));
  const [responseMessage, setResponseMessage] = useState(true);

  const handleAnswerSubmit = (index, answer, type) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = { question: props.surveyData[index].question, answer, type };
      return updatedAnswers;
    });
  };

  const handleSurveySubmit = () => {
    if (answers.length < props.surveyData.length) {
      alert('Please submit all responses');
      return;
    }

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === undefined || answers[i] === 'empty' || answers[i].answer === '') {
        alert('Please submit all responses');
        return;
      }
    }
    const body = {
      surveyId: props.taskId,
      response: answers,
    };

    axios
      .post(`${baseurl}/add-Survey`, body)
      .then((response) => console.log('Response submitted'))
      .catch((error) => console.error(error));

    setResponseMessage(false);
  };

  return (
    <>
      {responseMessage && (
        <Stack spacing={4}>
          {props.surveyData.map((question, index) => (
            <React.Fragment key={question._id}>
              {question.type === 'radio' && (
                <RadioQuestion
                  question={question}
                  index={index}
                  onAnswerSubmit={(answer) => handleAnswerSubmit(index, answer, 'radio')}
                />
              )}
              {question.type === 'checkbox' && (
                <CheckboxQuestion
                  question={question}
                  index={index}
                  onAnswerSubmit={(answer) => handleAnswerSubmit(index, answer, 'checkbox')}
                />
              )}
              {question.type === 'input' && (
                <InputQuestion
                  question={question}
                  index={index}
                  onAnswerSubmit={(answer) => handleAnswerSubmit(index, answer, 'input')}
                />
              )}
            </React.Fragment>
          ))}
          <Button colorScheme="teal" onClick={handleSurveySubmit}>
            Submit Survey
          </Button>
        </Stack>
      )}
      {!responseMessage && <ResponseMessage />}
    </>
  );
};

export default SurveyComponent;
