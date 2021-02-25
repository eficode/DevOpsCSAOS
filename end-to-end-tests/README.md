
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
 

## Usage

To run tests locally:

! to test the newest version of app frontend has to be re-built and re-launched before e2e test run

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

! Test database resets only when backend is re-started in test mode.
Tests will not pass if backend is not re-started between test runs

! resource.robot contains variables with text content of buttons in application. If
text in a button used in tests is changed, tests will break. Update variables if needed.
(Why not test-ids to avoid breaking tests? Tests should break if button texts change because that indicates
a change in how the application should work.)

### Upgrades to test scripts

* automate robot framework to start application before test suite run

* a better way to reset test database to avoid manual re-start (prev point should fix)

* staging uses static build -> end-to-end test the static build or change staging
