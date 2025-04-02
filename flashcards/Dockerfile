# Use Node.js LTS as the base image
FROM node:20

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN node ace generate:key --force
RUN node ace migration:run --force
RUN node ace serve --watch --force
# Copy the entire project
COPY . .

# Expose the port AdonisJS runs on
EXPOSE 3333

# Start the application
CMD ["node", "ace", "serve", "--watch"]