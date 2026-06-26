const parseGeminiResponse = (response) => {
  return response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

export default parseGeminiResponse;