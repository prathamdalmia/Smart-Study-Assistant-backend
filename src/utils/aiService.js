const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askAI = async (prompt) => {
  try {
    // Use the correct model name from the v1 endpoint
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response.trim();
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return `⚠️ Sorry, there was an error communicating with the AI service. ${error.message}`;
  }
};
