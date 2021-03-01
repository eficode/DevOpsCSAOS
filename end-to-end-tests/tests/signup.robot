*** Settings ***
Documentation   For testing signup + signup validation.
Resource        resource.robot

*** Test Cases ***

Invalid Email
  [Setup]       Seed Database With Test Data
  [Template]    Signup With Invalid Email Should Fail
  ${EMAIL_WITHOUT_AT_SIGN}  
  ${EMPTY}
  ${LONG_EMAIL}
  [Teardown]    Close Application

Email Already In Database (Should Fail)
  [Setup]       Seed Database With Test Data And A User
  Open Browser To Main Page
    Click get started button
    Insert Email    ${EMAIL_IN_DATABASE}
    Click Begin Button
    Alert Should Be Present
  [Teardown]    Close Application

Valid Email
  [Setup]       Seed Database With Test Data And A User
  Open Browser To Main Page
    Click get started button
    Insert Email    ${VALID_EMAIL}
    Click Begin Button
    Questions Page Should Be Open
  [Teardown]    Close Application
