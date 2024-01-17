# Stage 1: Build the Express.js app
FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
