// export function parseJsonBlock(input: string) {
//   // Remove ```json and ``` (with optional whitespace or newlines)
//   const cleaned = input.replace(/```json\s*([\s\S]*?)\s*```/, "$1").trim();

//   // Parse the cleaned string into an object
//   try {
//     return JSON.parse(cleaned);
//   } catch (err) {
//     console.error("Invalid JSON:", err);
//     return null;
//   }
// }
// from this data i need make this js object using function that removes
// json using regex and json parse to return object

export function cleanText(input: string) {
  return input
    .replace(/[`"'\\]/g, "") // remove quotes, backticks, and backslashes
    .replace(/[^\w\s.,;:()!?-]/g, "") // remove special symbols except punctuation
    .replace(/\s+/g, " ") // collapse multiple spaces
    .replace(/\s([.,;:!?])/g, "$1") // remove spaces before punctuation
    .trim(); // remove leading/trailing spaces
}

export function parseJsonBlockSafe(input: string) {
  const cleaned = input.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Invalid JSON from AI:", err);
    console.log("AI text was:", cleaned);
    return null;
  }
}
