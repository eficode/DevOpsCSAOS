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
postgres=# CREATE DATABASE prod_db;
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


