# ---------- Stage 1: Build (optional) ----------
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Copy only package.json & package-lock.json first for caching
COPY package*.json ./

# Install dependencies (all for build stage)
RUN npm install

# Copy the rest of the app
COPY . .

# ---------- Stage 2: Production ----------
FROM node:18-slim

WORKDIR /app

# Copy only needed files from build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose your backend port
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]

