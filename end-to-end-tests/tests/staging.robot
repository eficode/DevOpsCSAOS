*** Settings ***
Documentation   For testing survey
Resource        ../resources/staging/staging_url_navigation_resource.robot
Resource        ../resources/staging/survey_resource.robot
Resource        ../resources/staging/result_resource.robot
Force Tags    Staging

*** Test Cases ***

Staging server is up and front page on test url is reachable
  Open Browser To Main Page
  [Teardown]    Close Application

Answering all questions leads user to summary page
  Open Browser To Main Page
  Answer all questions
  [Teardown]    Close Application

Answering only some questions gives user an alert
    Open Browser To Main Page
    Answer some questions
    [Teardown]    Close Application

# Alert Is Shown If User Has Entered Invalid Email And Clicks Submit
#   Complete survey and submit answers
#   Submit invalid email
#   Check privacy box
#   Click submit
#   Alert Should Be Present
#   [Teardown]    Close Application

