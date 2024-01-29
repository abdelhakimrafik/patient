FROM node:21

# Set working directory to app
WORKDIR /app

# Copy package.json file
COPY package.json ./

# Install all dependencies
RUN npm install

# Copy api source files
COPY . .

# Build the api
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]