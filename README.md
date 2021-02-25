# DevOps capability self-assessment online survey

An online survey that software engineers and operations experts can use to assess their current DevOps capability. The survey will be based on statements regarding software development culture and tools and will provide feedback of Devops capability after the survey is completed.

[Link to the application in Heroku](https://ohtu-csaos-staging.herokuapp.com/)

## Running the application locally

(The commands are run in the root folder of the project.)

To start the server:
```bash
cd backend
npm ci
npm run dev
```

The server will be listening on [http://localhost:5000/](http://localhost:5000/).

Please note that the Postgres database has to be set up before running the server. [See here for instructions.](https://github.com/Devops-ohtuprojekti/DevOpsCSAOS/blob/main/backend/README.md) 

To start the client:

```bash
cd frontend
npm ci
npm run dev
```

Then open [http://localhost:3000/](http://localhost:3000/) to see the app.<br>
For a production build, create a minified bundle with `npm run build`.

## Running the application with Docker Compose locally

To run the application with Docker, you have to have Docker and Docker Compose installed. [See here for installation instructions](https://docs.docker.com/). For Docker Compose, you need to create an .env file to the project root (the folder in which the docker-compose.yml file is located) with following contents:

```
POSTGRES_USER=*give some username* 
POSTGRES_PASSWORD=*give some password*
POSTGRES_DB=dev_db
DB_USER=*same username as for postgres*
DB_PASS=*same password as for postgres*
DB_HOST=dev_db
```
To build and run the docker compose, give the following commands in the root directory:

```
docker-compose build
docker-compose up
```

## Documentation

### Definition of Done

* Code passes linting.
* Code has been peer-reviewed.
* Code has unit testing.
* Code has user level testing if applicable.
* Code passes tests.
* Code has been integrated to app, and app still passes all tests.
* Code has been pushed to Heroku and is part of the accessible app.
