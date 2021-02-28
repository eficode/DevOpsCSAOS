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

Signup With Email Already In Database Sould Fail
  [Setup]       Seed Database With Test Data And A User
  [Template]    Signup With Invalid Email Should Fail
  ${EMAIL_IN_DATABASE}
  [Teardown]    Close Application


#Valid Email
