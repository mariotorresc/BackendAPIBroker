# Use a base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./
# COPY yarn.lock ./
ENV NEW_RELIC_NO_CONFIG_FILE=true

# Install dependencies
RUN yarn install

# Copy the rest of the files
COPY . .

# Expose the application port
EXPOSE 3010

# Custom script to wait for the database and run migrations
CMD ["node", "index.js"]
