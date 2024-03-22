const openai = require('openai');

const openaiClient = new openai.OpenAI();

const systemMessage = {
  role: "assistant",
  content: "You are an assistant help people to setup trip for fun. Please be concise and clear."
};

async function getStreamingCompletion({ userPrompt }) {
  return openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [systemMessage, { role: "user", content: userPrompt }],
    stream: true,
    max_tokens: 512,
  });
}

module.exports = {
  getStreamingCompletion,
};