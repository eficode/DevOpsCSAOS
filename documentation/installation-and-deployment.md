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

This application uses Hubspot for sending result email to users. In your Hubspot account. In `Contacts > Actions > Edit properties` create properties called `User Full Results Page Link` and `Group invite link`. 

### Environment variables and secrets

For development, create an .env-file to the `backend` root with following contents:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASS=*your password*
HUBSPOT_API_KEY=*your hubspot api key*
SECRET_FOR_TOKEN=*any string*
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

### Environment variables needed in production environment


- DATABASE_URL

As the name suggests, url of the database connected to the server, the url should look like this:
"postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName"

- HUBSPOT_API_KEY

- NODE_ENV

The value of the NODE_ENV environment value should be "production"

- SECRET_FOR_TOKEN

The value should be some secret string. It is simply used to create jwt tokens for users.
