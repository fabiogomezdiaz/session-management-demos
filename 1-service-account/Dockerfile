FROM node:10-alpine

# Set Environment Variables
#ENV NPM_CONFIG_PREFIX=/home/blue/.npm-global
#ENV PATH=$PATH:/home/blue/.npm-global/bin
ENV NODE_ENV production

# Create app directory, chgrp, and chmod
ENV APP_HOME=/app
RUN mkdir -p $APP_HOME
RUN chgrp -R 0 $APP_HOME && chmod -R g=u $APP_HOME
WORKDIR $APP_HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# User
USER 1001

EXPOSE 8080
CMD [ "node", "index.js" ]