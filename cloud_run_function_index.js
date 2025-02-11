const functions = require('@google-cloud/functions-framework');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCi1TNkktc0B0N7Y8IJVh8IqFkMKqxYrNs");
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    tools: [{ googleSearch: {} }]
});

functions.http('helloHttp', (req, res) => {
    (async () => {

        try {

            const prompt = req.query.prompt;
            var output = ""
            const result = await model.generateContent(prompt);
            for (part of result.response.candidates[0].content.parts) {
                output = output + part.text;
            }
            output = output + "## evidences -------------------------------------"
            output = output + "## evidences -------------------------------------" + "\n";
            if (result.response.candidates[0].groundingMetadata.groundingSupports) {
                for (support of result.response.candidates[0].groundingMetadata.groundingSupports) {
                    output = output + support.segment.text + "\n";
                    for (indice of support.groundingChunkIndices) {
                        output = output + result.response.candidates[0].groundingMetadata.groundingChunks[indice].web.title + "\n";
                        output = output + result.response.candidates[0].groundingMetadata.groundingChunks[indice].web.uri + "\n";
                    }
                }

            }

            res.set('Content-Type', 'text/plain; charset=utf-8');
            console.log(output)
            res.send(output);
        } catch (error) {
            console.error("gemini api fail")
            res.status(500).send(`Error calling API: ${error}`);

        }

    })();

});
