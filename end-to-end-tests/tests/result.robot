*** Settings ***
Documentation   For testing survey
Resource        ../resources/db_resource.robot
Resource        ../resources/url_navigation_resource.robot
Resource        ../resources/survey_resource.robot
Resource        ../resources/result_resource.robot

*** Test Cases ***

Clicking Link To Privacy Policy Leads To Privacy Policy Page With Link Back To Results
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Click Privacy policy link and wait
  Privacy Policy Page Should Be Open
  Click back to results link and wait
  Result Page Should Be Open
  [Teardown]    Close Application

Alert Is Shown If User Has Not Agreed To Privacy Policy When Submitting Email
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Submit email
  Click submit
  Alert Should Be Present
  [Teardown]    Close Application

User Is Notified When Email Submit Is Successful
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Submit email
  Check privacy box
  Click submit and wait
  [Teardown]    Close Application