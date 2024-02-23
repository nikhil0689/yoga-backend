FROM node:21

RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json package-lock.json ./
RUN npm install --no-optional

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the production build
ENTRYPOINT ["npm"]
CMD ["run", "start:debug"]

# docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Minchu123# -d mysql

