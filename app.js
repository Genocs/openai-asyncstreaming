require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const openAIClient = require('./src/openAI.js');

const myModule = require('./src/fooModule.js'); // Importing your module

console.log(myModule.greet('John')); // Output: Hello, John!


const app = express();
const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    //return res.json({ data: "success" });
    res.send('Ready!');
});

app.post("/aiCompletion", async (req, res) => {
    const data = req.body;
    let starttime = Date.now();
    const stream = await openAIClient.getStreamingCompletion({ userPrompt: data?.userPrompt });
    for await (const part of stream) {
        // here express will stream the response
        res.write(part.choices[0]?.delta.content || "");
    }
    // here express sends the closing/done/end signal for the stream consumer
    res.end();
});


app.post("/longstreaming", async (req, res) => {

    const max = (req.body.max || 50) * 1000; // max in seconds
    res.write("hello");
    await myModule.wait(max); // This will block the event loop for 50 seconds (max = 50

    // here express sends the closing/done/end signal for the stream consumer
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
