# Use an official Node runtime as the base image
FROM node:18 AS builder

# set for base and all layer that inherit from it

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl sqlite3

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Remix app
RUN npm run build

FROM node:18-slim AS final
ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g pm2

# Install only production dependencies
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/public /app/public

RUN npm ci --only=production

#COPY --from=builder /app/node_modules /app/node_modules

ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
# CMD ["npm", "start"]
CMD ["pm2-runtime", "npm", "--", "start"]

