# Use official Node.js image as the base image
FROM node:20

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["node", "app.js"]