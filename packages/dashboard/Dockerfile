FROM node:21

# Set working directory to app
WORKDIR /app

# Create project folder
RUN mkdir packages
RUN cd packages && mkdir dashboard

# Copy package.json file
COPY packages/dashboard/package.json ./packages/dashboard

# Copy global tsconfig file
COPY tsconfig.json .

# Copy dashboard source files
COPY packages/dashboard ./packages/dashboard

WORKDIR /app/packages/dashboard

# Install all dependencies
RUN npm install

# Build the api
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the server using the production build
CMD [ "npm", "run", "preview" ]