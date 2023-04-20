# --- Build stage for React frontend ---
FROM node:14 AS frontend-build
WORKDIR /
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Build stage for Node.js server ---
FROM node:14 AS server-build
WORKDIR /
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# --- Final stage ---
FROM node:14
WORKDIR /

# Copy build artifacts from previous stages
COPY --from=frontend-build /build/ ./frontend/build/
COPY --from=server-build / ./server/

# Expose the server port
EXPOSE 3001

# Start the server
CMD ["node", "./server/index.js"]
