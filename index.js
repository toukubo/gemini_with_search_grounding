const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCi1TNkktc0B0N7Y8IJVh8IqFkMKqxYrNs");
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    tools: [{ googleSearch: {} }]
});
var args = process.argv;


const prompt = args[2];
// console.log(args[0]);
// console.log(args[1]);
// console.log(args[2]);
(async () => {

const result = await model.generateContent(prompt);
    // console.log(result.response.candidates[0].groundingMetadata);
    // console.dir(result.response);
    // console.log(result.response.candidates[0].content.parts[0].text);
    // console.dir(result.response.candidates[0].content.parts);
    for (part of result.response.candidates[0].content.parts){
        console.log(part.text)
    }


})();


// // Generate the response
// async function generateResponse() {
//     try {
//         const result = await model.generateMessage({
//             prompt,
//         });

//         // Output the model's response
//         console.log(result.candidates[0].content);

//         // If available, output grounding metadata
//         if (result.candidates[0].groundingMetadata) {
//             console.log('Grounding Metadata:', result.candidates[0].groundingMetadata);
//         }
//     } catch (error) {
//         console.error('Error generating response:', error);
//     }
// }

// generateResponse();