import React, { useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIMODAL = ({ prompt, setAiResponse }) => {

  const Apikey = "AIzaSyDFdVNqpnca6MvaKRk0YqVFCNb1O45r9Ns";
  
  const fetchResponse = async () => {
    try {
      const ai = new GoogleGenAI({
        apiKey: "AIzaSyDFdVNqpnca6MvaKRk0YqVFCNb1O45r9Ns",
      });

      const config = {
        responseMimeType: 'application/json',
      };

      const model = 'gemini-2.0-flash';

      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ];

      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let finalText = '';
      for await (const chunk of response) {
        finalText += chunk.text;
      }
      console.log('AI Response:', finalText);
      setAiResponse(finalText);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  useEffect(() => {
    if (prompt) {
      fetchResponse();
    }
  }, [prompt]);

  return null;
};

export default AIMODAL;
