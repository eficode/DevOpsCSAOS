*** Settings ***
Documentation     A test suite with a single test for testing that main page is open.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot
Suite Teardown    Terminate All Processes    kill=True

*** Test Cases ***

Main page can be opened
    Open Browser To Main Page
    Main Page Should Be Open
    [Teardown]    Close Browser

User can access the survey with valid email
    Open Browser To Main Page
    Click get started button
    Insert Email  ${VALID_EMAIL}
    Click begin button
    Questions Page Should Be Open
    [Teardown]    Close Browser

User can't access the survey with invalid email
    Open Browser To Main Page
    Click get started button
    Insert Email  ${INVALID_EMAIL}
    Click begin button
    Contact Page Should Be Open
    [Teardown]    Close Browser

User can answer the questions and get results
    Open survey and insert credentials
    Answer all questions
    Click answer summary button
    Click go to results
    Result Page Should Be Open
    [Teardown]    Close Browser

