import axios, { AxiosResponse } from 'axios';

const openAiApiKey = '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';
const googleMapsApiKey = 'AIzaSyAd1uq-PtSD6XeFjTqT1f1k4ouF0tokqgU';

const openAiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const googleMapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

interface OpenAiResponse {
    choices: [{ text: string }];
  }
  
  interface GoogleMapsResponse {
    results: any[]; // Adjust based on the actual structure of the response
  }
  
  export const getOpenAiResponse = async (query: string): Promise<string> => {
    try {
      const response: AxiosResponse<OpenAiResponse> = await axios.post(
        openAiApiUrl,
        {
          prompt: query,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`,
          },
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      return 'Error fetching response';
    }
  };
  
  export const getGeographicalInfo = async (location: string): Promise<any[]> => {
    try {
      const response: AxiosResponse<GoogleMapsResponse> = await axios.get(googleMapsApiUrl, {
        params: {
          address: location,
          key: googleMapsApiKey,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching geographical information:', error);
      return [];
    }
  };
