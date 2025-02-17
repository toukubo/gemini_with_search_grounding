require('dotenv').config();
const {GoogleGenerativeAI} = require("@google/generative-ai");
const API_KEY = process.env.api_key;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-pro-exp',
    tools: [{ googleSearch: {} }]
});
var args = process.argv;


const prompt = args[2];
// console.log(args[0]);
// console.log(args[1]);
// console.log(args[2]);
(async () => {

    // const result = await model.generateContent(prompt);
    // var output = ""
    // for (part of result.response.candidates[0].content.parts){
    //    output = output + part.text;
    // }

    // ######### streaming model code 
    try {
        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
            process.stdout.write(chunk.text());
        }
        console.log('\n'); // Add a newline for better formatting
        const response = await result.response;
        console.log(JSON.stringify(response));

    } catch (error) {
        console.error("Error during streaming:", error);
    }

    // output = output + "## evidences -------------------------------------" + "\n";
    // if (result.response.candidates[0].groundingMetadata.groundingSupports){
    //     for (support of result.response.candidates[0].groundingMetadata.groundingSupports) {
    //         output = output + support.segment.text + "\n";
    //         for (indice of support.groundingChunkIndices) {
    //             output = output + result.response.candidates[0].groundingMetadata.groundingChunks[indice].web.title + "\n";
    //             output = output + result.response.candidates[0].groundingMetadata.groundingChunks[indice].web.uri + "\n";
    //         }
    //     }

    // }
    // console.log(output)

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