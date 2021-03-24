*** Settings ***
Documentation   For testing signup + signup validation.
Resource        ../resources/db_resource.robot
Resource        ../resources/signup_resource.robot
Resource        ../resources/url_navigation_resource.robot

*** Variables ***
${VALID_EMAIL}            test2222@test.com
${EMAIL_WITHOUT_AT_SIGN}  mail.mail.com
${LONG_EMAIL}             aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

*** Test Cases ***

User can't sign up with invalid email
  [Setup]       Seed Database With Test Data
  [Template]    Signup With Invalid Email Should Fail
  ${EMAIL_WITHOUT_AT_SIGN}
  ${LONG_EMAIL}
  [Teardown]    Close Application

User can signup with valid email
  [Setup]       Seed Database With Test Data
  Signup With Email   ${VALID_EMAIL}
  Questions Page Should Be Open
  [Teardown]    Close Application
