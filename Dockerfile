## build runner
FROM node:lts-alpine as build-runner

# Set temp directory
WORKDIR /tmp/app

# Move package.json
COPY package.json .

# Install dependencies
RUN npm install

# Move source files
COPY src ./src
COPY tsconfig.json   .

# Build project
RUN npm run build

## producation runner
FROM node:lts-alpine as prod-runner

# Set work directory
WORKDIR /app

# Copy package.json from build-runner
COPY --from=build-runner /tmp/app/package.json /app/package.json

# Install dependencies
RUN npm install --only=production

# Fonts
RUN apk add --no-cache msttcorefonts-installer fontconfig
RUN update-ms-fonts
    
# Move build files
COPY --from=build-runner /tmp/app/build /app/build

# Expose 80 port
EXPOSE 80

# Start bot
CMD [ "node", "build/main.js" ]

