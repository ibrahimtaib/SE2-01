# Stage 1: Build the Prisma service and dependencies
FROM node:14 as prisma-builder

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies for Prisma
RUN npm install

# Copy the Prisma schema and other necessary files
COPY prisma .

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Final image with only Prisma service
FROM node:14

WORKDIR /app

# Copy built Prisma service from the previous stage
COPY --from=prisma-builder /app/node_modules ./node_modules
COPY --from=prisma-builder /app/prisma ./prisma
COPY --from=prisma-builder /app/prisma-client ./prisma-client

# Expose any necessary ports for Prisma
# (e.g., if Prisma service listens on a specific port)
EXPOSE 4000

# Command to run the Prisma service
CMD ["npm", "start"]
