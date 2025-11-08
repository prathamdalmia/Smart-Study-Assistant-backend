const { askAI } = require("../utils/aiService");

exports.chat = async (req, res) => {
  const { message } = req.body;
  const reply = await askAI(message);
  res.json({ reply });
};

exports.summarize = async (req, res) => {
  const { text } = req.body;
  const reply = await askAI(`Summarize this text:\n${text}`);
  res.json({ summary: reply });
};

exports.quiz = async (req, res) => {
  const { text } = req.body;
  const prompt = `
Generate exactly 5 multiple-choice questions (MCQs) from the following text:

"${text}"

Each question must have:
- "q": the question
- "options": an array of 4 options
- "answer": the correct answer (must match one of the options)
- "explanation": a short explanation

Return the result strictly as JSON:
[{"q":"","options":[""],"answer":"","explanation":""}]
`;
  const reply = await askAI(prompt);
  res.json({ quiz: reply });
};
