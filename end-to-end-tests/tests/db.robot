*** Settings ***
Documentation     A test suite for testing e2e test setup.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***

# tests that front has started
User data can be inserted to database
    Test Database Connection
    