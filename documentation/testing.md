# Testing

## Frontend

Jest is used for frontend testing. Frontend tests are used to make sure pages are rendered as intended. Frontend tests cover tests for question, result and summary pages.

Run tests locally:

- Run in frontend directory to run tests

```
npm run test
```

## Backend

Jest and Supertest are used for backend testing. Backend testing covers endpoints for answers, email submit, questions and users. In individual tests, Supertest provides with response from the endpoint and both response body and HTTP status can be tested.

Run tests locally:

- Run in backend directory to run tests

```
npm run test
```

## End-to-end

This application uses Robot Framework for end-to-end testing. End-to-end tests are used to simulate real user scenarios and test the application from beginning to end. They make sure the application works as intended. Test cases covered include for example result page being shown when all answers to survey are submitted, alert is shown instead of result page when there are unanswered questions, and user is auto-directed to next page when all questions on page are answered.

### Setup

These instructions have been tested to work with Unix and Windows 10.

You need to have python and pip installed on your pc. The tests have been run with python 3.8.

### Steps

#### 1. Create virtual env

in end-to-end-tests folder:

```console

$ python3 -m venv env

```

#### 2. Activate virtual env

in end-to-end-tests folder:

Unix/MacOS:

```console

$ source env/bin/activate

```

Windows:

```console

$ env\Scripts\activate.bat

```

#### 3. Install requirements

in end-to-end-tests folder:

```console

$ pip install -r requirements.txt

```

#### 4. Install geckodriver

in end-to-end-tests folder:

```console

$ webdrivermanager firefox

```
or, but you need to specify chrome in url_navigation_resource.robot file.
```console

$ webdrivermanager chrome

```

#### 5. Setup database

Create directory resources and create file db.cfg in end-to-end-tests folder with the following content (the variables have to be specified as in the docker-compose):

```
[default]
dbapiModuleName=psycopg2
dbName=endtoend_test_db
dbUsername=*the username in the docker compose*
dbPassword=*the password in the docker compose*
dbHost=localhost
dbPort=5400
```

### Use

In end-to-end-tests folder

1. Build and start the docker containers used for testing:

```
docker-compose up
```

2. Activate virtual env in end-to-end directory

```
source env/bin/activate
```

3. Run in end-to-end directory to run tests

```
robot tests
```
