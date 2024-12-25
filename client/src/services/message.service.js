import { callExternalApi } from "./external-api.service";
import OpenAI from "openai";

// Initialize OpenAI with the new v4 syntax
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const sendMessageToBot = async ({ prompt, aiModel, context = null }) => {
  try {
    if (aiModel === "rag") {
      // RAG uses our Python backend
      const url = `${apiServerUrl}/api/messages/rag`;
      const config = {
        url,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: {
          prompt,
          context,
        },
      };

      const { data, error } = await callExternalApi({ config });
      return { data, error };
    } else if (aiModel === "gpt4") {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using GPT-3.5 as discussed
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      return {
        data: {
          bot: completion.choices[0].message.content,
          // Remove limit from response
        },
        error: null,
      };
    }
  } catch (error) {
    console.error("Error in sendMessageToBot:", error);
    return {
      data: null,
      error: {
        message: error.message,
        status: error.response?.status,
      },
    };
  }
};

export const uploadDocuments = async (files) => {
  const url = `${apiServerUrl}/api/documents/upload`;

  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  const config = {
    url,
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: formData,
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
