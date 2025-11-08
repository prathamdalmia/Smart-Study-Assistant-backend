const { askAI } = require("../utils/aiService");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const reply = await askAI(message);
    res.json({ reply });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
};

exports.summarize = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const reply = await askAI(`Summarize this text:\n${text}`);
    res.json({ summary: reply });
  } catch (error) {
    console.error('Error in summarize:', error);
    res.status(500).json({ 
      error: 'Failed to summarize text',
      details: error.message 
    });
  }
};

exports.quiz = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const prompt = `
You are a quiz generator. Generate exactly 5 multiple-choice questions (MCQs) from the following text.

Text: "${text.substring(0, 2000)}"

IMPORTANT: Return ONLY valid JSON array format, no markdown, no code blocks, no explanations outside the JSON.

Each question must have:
- "q": the question text (string)
- "options": an array of exactly 4 option strings
- "answer": the correct answer string (must exactly match one of the options)
- "explanation": a short explanation string

Return ONLY this JSON format:
[{"q":"Question text here","options":["Option 1","Option 2","Option 3","Option 4"],"answer":"Correct Option","explanation":"Explanation here"}]

Return the JSON array now:`;

    const reply = await askAI(prompt);
    
    // Try to extract and parse JSON from the response
    let quizData = null;
    
    if (typeof reply === 'string') {
      try {
        // Remove markdown code blocks if present
        let cleanReply = reply.trim();
        cleanReply = cleanReply.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        // Try to find JSON array in the response
        const jsonMatch = cleanReply.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          quizData = JSON.parse(jsonMatch[0]);
        } else {
          // Try parsing the whole string
          quizData = JSON.parse(cleanReply);
        }
      } catch (parseError) {
        console.error('Error parsing AI response as JSON:', parseError);
        console.error('Raw AI response:', reply);
        return res.status(500).json({ 
          error: 'Failed to parse quiz response. Please try again.',
          details: 'The AI response was not in valid JSON format'
        });
      }
    } else {
      quizData = reply;
    }
    
    // Validate the quiz data
    if (!Array.isArray(quizData)) {
      return res.status(500).json({ 
        error: 'Invalid quiz format',
        details: 'Expected an array of questions'
      });
    }
    
    // Validate and clean each question
    const validQuiz = quizData
      .filter((q) => q && (q.q || q.question) && Array.isArray(q.options) && q.options.length >= 2 && q.answer)
      .slice(0, 5) // Limit to 5 questions
      .map((q) => ({
        q: q.q || q.question || '',
        options: q.options.slice(0, 4), // Ensure max 4 options
        answer: q.answer || q.options[0] || '',
        explanation: q.explanation || '',
      }));
    
    if (validQuiz.length === 0) {
      return res.status(500).json({ 
        error: 'No valid questions generated',
        details: 'Please try again with different content'
      });
    }
    
    res.json({ quiz: validQuiz });
  } catch (error) {
    console.error('Error in quiz generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: error.message 
    });
  }
};
