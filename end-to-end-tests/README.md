# End-to-End tests with robotframework



## Installation guide
This installation guide works atleast for Windows 10, not sure yet if it works for other OS:s since no one has tested with other OS yet. It should work, but who knows.

You need to have python and pip installed on your pc. I am using python 3.8.

### Steps

#### 1. Create virtual env
```console
$ python3 -m venv env 
```

#### 2. Activate virtual env
Unix/MacOS:
```console
$ source env/bin/activate
``` 
Windows:
```console
$ env\Scripts\activate.bat
```

#### 3. Install requirements

```console
$ pip install -r requirements.txt
```

#### 4. Install geckodriver

```console
$ webdrivermanager firefox
```

## Usage

To run tests locally, make sure virtualenv is activated. 
Create new build from frontend. Then turn backend on.

Run tests:
```console
robot tests
```
