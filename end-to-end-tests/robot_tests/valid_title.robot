*** Settings ***
Documentation     A test suite with a single test for testing that main page is open.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Main page can be opened
    Open Browser To Main Page
    Main Page Should Be Open
    [Teardown]    Close Browser
