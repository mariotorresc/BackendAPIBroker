# Use a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the files
COPY . .

# Expose the application port
EXPOSE 3000

# Custom script to wait for the database and run migrations
CMD ["./start.sh"]
