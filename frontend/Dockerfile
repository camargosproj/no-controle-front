FROM node:18

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
