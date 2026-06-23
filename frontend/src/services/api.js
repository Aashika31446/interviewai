import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const processAudioToAI = async (audioBlob, questionContext) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'response.wav');
  if (questionContext) {
    formData.append('question_context', questionContext);
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/interviews/process-audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error processing audio:', error);
    throw error;
  }
};
