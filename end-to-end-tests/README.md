
# End-to-End tests with robotframework

  
  
  

## Installation guide

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

#### 5. Create database env file

Create directory resources and create file db.cfg in end-to-end-tests folder with the following content:

[default]
dbapiModuleName=psycopg2
dbName=test_db
dbUsername=${DB_USER}
dbPassword=${DB_PASS}
dbHost=${DB_HOST}
dbPort=5432

copy variables from backend .env file (replace vars with username etc. specified in .env)
 

## Usage

To run tests locally:

In project root to start application in test mode:
```
npm run start:robot
```

Activate virtual envin end-to-end directory:

```
source env/bin/activate
```

Run tests:

```
robot tests
```

! resource.robot contains variables with text content of buttons in application. If
text in a button used in tests is changed, tests will break. Update variables if needed.
(Why not test-ids to avoid breaking tests? Tests should break if button texts change because that indicates
a change in how the application should work.)
