*** Settings ***
Documentation   For testing survey
Resource        ../resources/db_resource.robot
Resource        ../resources/url_navigation_resource.robot
Resource        ../resources/survey_resource.robot

*** Test Cases ***

Clicking Link To Privacy Policy Leads To Privacy Policy Page With Link Back To Results
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Click Privacy policy link and wait
  Privacy Policy Page Should Be Open
  Click back to results link and wait
  Result Page Should Be Open
  [Teardown]    Close Application