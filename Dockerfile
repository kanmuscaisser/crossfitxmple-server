# syntax=docker/dockerfile:experimental
#
# This Dockerfile contains multiple steps:
# 1. Checkout all dependencies including development dependencies
# 2. Checkout only production dependencies
# 3. Run tests using development dependencies
# 4. Build production image for distribution

# Step 1
FROM node:12.8.0 AS headless-configure-node_modules_development

# Download public key for bitbucket.org
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts

COPY package.json package-lock.json ./

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

RUN --mount=type=ssh npm install

# Step 2
FROM node:12.8.0 AS headless-configure-node_modules_prod

# Download public key for bitbucket.org
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts

COPY package.json package-lock.json ./

COPY --from=headless-configure-node_modules_development /node_modules ./node_modules

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

RUN --mount=type=ssh npm install --production

# Step 3
FROM node:12.8.0 AS headless-configure-tests

COPY . .

COPY --from=headless-configure-node_modules_development /node_modules ./node_modules

RUN npm test

# Step 4
FROM node:12.8.0

RUN useradd -m -s $(which bash) -d /app app

VOLUME /app
WORKDIR /app

ADD --chown=app ./ .

COPY --from=headless-configure-node_modules_prod --chown=app /node_modules ./node_modules

USER app

# Prometheus metrics port
EXPOSE 9055

EXPOSE 1449

CMD ["npm", "start"]
