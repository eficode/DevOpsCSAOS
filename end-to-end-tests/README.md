
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

To run tests locally, make sure virtualenv is activated.

Create new build from frontend. Then turn backend on.
in frontend folder:
  ```console

npm run build

```
in end-to-end-tests folder:

Run tests:

```console

robot tests

```
