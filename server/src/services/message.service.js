const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Python server URL
const PYTHON_SERVER_URL =
  process.env.PYTHON_SERVER_URL || "http://localhost:8000";

const processMessage = async (prompt, aiModel) => {
  try {
    if (aiModel === "davinci") {
      // Make HTTP request to Python RAG server
      const response = await axios.post(`${PYTHON_SERVER_URL}/chat`, {
        message: prompt,
      });

      return {
        success: true,
        bot: response.data.final_answer,
        reasoning: response.data.reasoning,
        context: response.data.intermediate_steps,
      };
    } else if (aiModel === "gpt4") {
      // Use GPT-4 for text generation
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      return {
        success: true,
        bot: response.data.choices[0].message.content,
      };
    }
  } catch (error) {
    console.error("Error processing message:", error);
    throw error;
  }
};

// Add documents to vector store
const addDocuments = async (texts, metadata = null) => {
  try {
    const response = await axios.post(`${PYTHON_SERVER_URL}/add-documents`, {
      texts,
      metadata,
    });

    return {
      success: true,
      message: response.data.message || "Documents added successfully",
    };
  } catch (error) {
    console.error("Error adding documents:", error);
    throw error;
  }
};

module.exports = {
  processMessage,
  addDocuments,
};
