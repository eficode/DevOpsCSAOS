# Installation and deployment

## Development installation and use

To run this application locally, you need to have Node.js installed. [You can get it here.](https://nodejs.org/en/download/package-manager/) After this, download or clone the project and install dependencies by `npm install`. This has to be done separately for both `backend` and `frontend` folders.

Please do all the configurations mentioned below.

Start both `backend` and `frontend` by running `npm run dev` in both folders.

## Configuration

### Postgres

This application uses postgres database, which can be downloaded [here](https://www.postgresql.org/download/). Please follow the instructions below to set up the database.

Launch postgres and create databases:

```
postgres=# CREATE DATABASE dev_db;
postgres=# CREATE DATABASE test_db;
postgres=# CREATE DATABASE endtoend_test_db;
```

check existing users (default superuser name postgres):

```
postgres=# \du
```

change superuser password (if necessary):

```
postgres=# ALTER USER postgres WITH PASSWORD newpassword;
```

### Hubspot

This application uses Hubspot for sending result email to users. In your Hubspot account. In `Contacts > Actions > Edit properties` create properties called `Result Link For User` and `Group Invite Link`. 

Additionally, properties for each questions with the following characterstics:
- Name: the question - Maximum Character 100
- Field type: DropDown Select
- Options: Labels and Internal Values exactly as shown as in the following list
    - Strongly Disagree
    - Disagree
    - I do not know
    - Agree
    - Strongly Agree

### Environment variables and secrets

For development, create an .env-file to the `backend` root with following contents:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASS=*your password*
HUBSPOT_API_KEY=*your hubspot api key*
SECRET_FOR_TOKEN=*any string*
```

## Alternative installation

You can also install and use the application locally with the help of docker and docker compose. Make sure you have docker installed and is running. Go to the parent director of the application where you can find the docker-compose.yml file run the following command:

```
docker compose up --build
```

## Production

In production the application has been run in a single process. In addition to providing the backend functionality, the backend server also serves the frontend to clients. The dockerfile of the image used in production can be found [here](https://github.com/Devops-ohtuprojekti/DevOpsCSAOS/blob/main/Dockerfile). Steps in the file are quite straightforward:

- Install frontend dependencies
- Create frontend build
- Install backend dependencies

The dockerfile expects to receive URL of the backend as build argument. Meaning that the docker image needs to be built with command

```
docker build --build-arg API_URL=URL_OF_THE_SERVER_HERE
```

### Heroku Deployment

The application has a github action which automatically performs unit test, robot test and deploy the application to heroku by using HEROKU_API_KEY from github secrets. This takes place whenever a push to main branch happens. During deployment to Heroku, the Backend in Heroku accesses a bucket in Amazon S3 with the name defined in environment variabl “AWS_BUCKET” using two keys: “AWS_SECRET_KEY” and “AWS_ACCESS_KEY”. Using this access, the backend gets the JSON files to populate the POSTGRES database. The process is illustrated in the following image:

![Heroku Deployment Model](./assets/heroku_deployment_model.png).)

### AWS S3 instance

This application uses AWS S3 to store the json files. In order to access these json files, you need to create a bucket, access key and secret key which are identified by the environment variables AWS_BUCKET, AWS_ACCESS_KEY, and AWS_SECRET_KEY.


### Environment variables needed in production environment


- DATABASE_URL

As the name suggests, url of the database connected to the server, the url should look like this:
"postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName"

- HUBSPOT_API_KEY
- NODE_ENV

The value of the NODE_ENV environment value should be "production"

- SECRET_FOR_TOKEN: to encrypt the user ID.
- AWS_ACCESS_KEY: access key used to access AWS S3 storage bucket 
- AWS_SECRET_KEY: secret key used to access AWS S3 storage bucket
- AWS_BUCKET: bucket name for aws3 storage that holds the question files.
- BASE_URL_FOR_EMAILS: this is the url on which the application is being accessed.