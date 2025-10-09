# Use official Node image
FROM node:20

# Install psql client
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Copy wait-for-db script and make executable
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server, but wait for postgres
CMD ["sh", "./wait-for-db.sh", "npm", "start"]
