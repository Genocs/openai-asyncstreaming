require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const openapiValidator = require('express-openapi');
const swaggerUi = require('swagger-ui-express'); // Optional for UI (install separately)
//const apiSpec = require('./openapi.yaml'); // Path to your OAS file
const cors = require('cors');

const openAI = require('./src/openAI.js');
const myModule = require('./src/fooModule.js'); // Importing your module

console.log(myModule.greet('John')); // Output: Hello, John!


const app = express();
app.use(express.json()); // Parse JSON request bodies

//openapiValidator.init(apiSpec, app); // Add OpenAPI validation middleware
// Optional: Serve generated Swagger UI documentation
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    //return res.json({ data: "success" });
    res.send('Ready!');
});

app.post("/tripPlannerStrem", async (req, res) => {
    const data = req.body;
    const stream = await openAI.tripPlanner({ userPrompt: data?.userPrompt });
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
