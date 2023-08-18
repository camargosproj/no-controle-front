FROM node:18 AS development

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json *.lock ./
RUN yarn

# Copy app files
COPY . .

# Expose port for development
EXPOSE 4000


# RUN git clone https://github.com/vishnubob/wait-for-it.git

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
EXPOSE 4000

# Build app
RUN npx prisma generate && npx tsc

# Start production server
CMD ["yarn", "start"]

