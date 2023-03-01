FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json *.lock ./
RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Expose port for development
EXPOSE 4000


# RUN git clone https://github.com/vishnubob/wait-for-it.git

# Start development server
CMD ["yarn", "dev"]