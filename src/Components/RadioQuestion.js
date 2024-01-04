import React from 'react';
import { Box, Text, Radio, RadioGroup, Stack } from '@chakra-ui/react';

const RadioQuestion = ({ question, index, onAnswerSubmit  }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md"  display="flex" alignItems="flex-start">
      <Stack spacing={2}>
        <Text fontSize="lg">{`${index + 1}. ${question.question}`}</Text>
        <RadioGroup defaultValue="" mt={2} onChange={(e) => onAnswerSubmit( e)}>
          <Stack spacing={2} pl={4}>
            {question.options.map(option => (
              <Radio key={option._id} value={option.name}>
                {option.name}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
    </Box>
  );
};

export default RadioQuestion;
