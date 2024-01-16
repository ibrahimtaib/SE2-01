FROM node:16.13

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY src/services/prisma ./prisma
ENV DATABASE_URL "postgresql://ibrahim:password@172.19.0.2:5432/TMDB?schema=public&sslmode=prefer"

ENV POSTGRES_PASSWORD "password"
ENV POSTGRES_USER "ibrahim"
# Add the following lines to navigate to /src/services and run prisma db push
# WORKDIR /app/src/services

# If needed, add any other dependencies or configurations specific to your services
RUN npx prisma generate

# Run Prisma db push
# RUN npx prisma db push

# RUN npx prisma migrate dev

# Navigate back to the main app directory
WORKDIR /app

# Copy the rest of the application files
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
