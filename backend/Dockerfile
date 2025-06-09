# Base image
FROM node:22.14-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run type-check && npm run lint && npm run build

# -------------------------------
# Second stage: run built app
# -------------------------------
FROM node:22.14-alpine AS runner

WORKDIR /app

# Copy production dependencies only
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy built output from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config.js ./config.js

# COPY --from=builder /app/repos ./repos

# Set environment variables if needed
ENV NODE_ENV=production

# Expose desired port (update if needed)
EXPOSE 8001

# Run the application
CMD ["node", "-r", "./config.js", "./dist/index.js"]