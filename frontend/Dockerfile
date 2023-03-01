FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Expose port for development
EXPOSE 3000

# Start development server
CMD ["yarn", "dev"]
