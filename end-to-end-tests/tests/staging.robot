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
    Click go to results
    Page Should Contain Element   //*[contains(text(), 'Please answer all questions to continue.')]
    [Teardown]    Close Application

Alert Is Shown If User Has Entered Invalid Email And Clicks Submit
  Open Browser To Main Page
  Answer all questions
  Click go to results and wait
  Click submit
  Page Should Contain Element   //*[contains(text(), 'Please enter a valid email.')]
  [Teardown]    Close Application

Alert Is Shown If User Has Not Agreed To Privacy Policy When Submitting Email
  Open Browser To Main Page
  Answer all questions
  Click go to results and wait
  Submit email
  Click submit
  Page Should Contain Element   //*[contains(text(), 'Please accept the privacy policy before submitting your email.')]
  [Teardown]    Close Application

