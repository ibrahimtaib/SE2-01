# Stage 1: Build the Express.js app
FROM node:17.0.1-alpine3.14

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# run prisma generate on src/services/
RUN cd src/services/ && npx prisma generate

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
