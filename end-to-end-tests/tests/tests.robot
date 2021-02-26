*** Settings ***
Documentation     A test suite for testing e2e test setup.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***

# tests that front has started
Main page can be opened
    Open Browser To Main Page
    Main Page Should Be Open
    [Teardown]    Close Application

# tests that app connects to backend
User can access the survey with valid email and complete survey
    Open Browser To Main Page
    Click get started button
    Insert Email  ${VALID_EMAIL}
    Click begin button
    Answer all questions
    Click answer summary button
    Click go to results
    [Teardown]    Close Application

# tests that database is reseted between tests
# database reseting not working yet, uncomment assertion when db reset works
User can access the survey again with valid email
    Open Browser To Main Page
    Click get started button
    Insert Email  ${VALID_EMAIL}
    Click begin button
    Questions Page Should Be Open
    [Teardown]    Close Application

#User can't access the survey with invalid email
#    Open Browser To Main Page
#    Click get started button
#    Insert Email  ${INVALID_EMAIL}
#    Click begin button
#    Contact Page Should Be Open
#    [Teardown]    Close Browser

#User can answer the questions and get results
#    Open survey and insert credentials
#    Answer all questions
#    Click answer summary button
#    Click go to results
#    Result Page Should Be Open
#    [Teardown]    Close Browser

