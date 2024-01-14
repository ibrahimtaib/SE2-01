FROM node:latest

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY src/services/prisma ./prisma


# Add the following lines to navigate to /src/services and run prisma db push
WORKDIR /app/src/services

# If needed, add any other dependencies or configurations specific to your services
RUN npm prisma generate

# Run Prisma db push
RUN npm prisma db push

RUN npm prisma migrate dev

# Navigate back to the main app directory
WORKDIR /app

# Copy the rest of the application files
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
