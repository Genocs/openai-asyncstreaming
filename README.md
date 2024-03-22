# openai-asyncstreaming
A nodejs server based on express that allows to stream data coming from OpenAI


## How to use stream for an API call

This is a simple example of how to use the stream API to make a call to the API.


## How to build the project

To build the project, you can run the following command:

```bash
# Install dependencies
npm install

# Build and run the project
npm run start
```

## How to build with Docker

To build the project with Docker, you can run the following command:

```bash
# Build the Docker image
docker build -t my-nodejs-app .

# Run the Docker container
docker run -p 3000:3000 my-nodejs-app
```