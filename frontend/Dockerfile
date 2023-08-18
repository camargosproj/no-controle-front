FROM node:18 AS development

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json *.lock ./
RUN yarn

# Copy app files
COPY . .

# Expose port for development
EXPOSE 3000


# Start development server
CMD ["yarn", "dev"]

FROM node:18 AS production

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json *.lock ./
RUN yarn

# Copy app files
COPY . .

# Expose port for development
EXPOSE 3000

# Build app
RUN yarn build --no-lint

# Start production server
CMD ["yarn", "start"]

