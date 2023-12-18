import React, { useState } from 'react';
import { getOpenAiResponse, getGeographicalInfo } from '../../services/apiService';
import '../../assets/style/QuestionInput.css'; // Import the CSS file

interface QuestionInputProps {

}

const QuestionInput: React.FC<QuestionInputProps> = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call OpenAI API for understanding the query's context and intent
    const openAiResponse = await getOpenAiResponse(question);

    // Extract location information from OpenAI response
    const location = extractLocationFromResponse(openAiResponse);

    if (location) {
      // Call Google Maps API for geographical information
      const geographicalInfo = await getGeographicalInfo(location);

      // Process geographical information and set the answer
      const formattedAnswer = processGeographicalInfo(geographicalInfo);
      setAnswer(formattedAnswer);
    } else {
      setAnswer('Location not found in the query');
    }
  };

  const extractLocationFromResponse = (response: string): string | null => {
    // Implement your logic to extract location from OpenAI response
    // For example, use regex or a natural language processing library
    return 'Paris'; // Replace with the extracted location
  };

  const processGeographicalInfo = (geographicalInfo: any[]): string => {
    // Implement your logic to process the geographical information
    // For example, extract relevant details from the Google Maps API response
    return 'Geographical information'; // Replace with the processed information
  };

  return (
    <div className="question-input-container">
    <form onSubmit={handleSubmit}>
      <label>
        Ask a question:
        <input type="text" value={question} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
    {answer && <p className="answer">{answer}</p>}
  </div>
  );
};

export default QuestionInput;