*** Settings ***
Documentation   For testing survey
Resource        ../resources/local/db_resource.robot
Resource        ../resources/local/url_navigation_resource.robot
Resource        ../resources/local/survey_resource.robot
Resource        ../resources/local/result_resource.robot
Force Tags    Local

*** Test Cases ***

Clicking Link To Privacy Policy Leads To Privacy Policy Page With Link Back To Results
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Click Privacy policy link and wait
  [Teardown]    Close Application

Alert Is Shown If User Has Not Agreed To Privacy Policy When Submitting Email
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Submit email
  Click submit
  Page Should Contain Element   //*[contains(text(), 'Please accept the privacy policy before submitting your email.')]
  [Teardown]    Close Application

User Is Notified When Email Submit Is Successful
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Submit email
  Check privacy box
  Click submit and wait
  [Teardown]    Close Application

Alert Is Shown If User Has Entered Invalid Email And Clicks Submit
  [Setup]       Seed Database With Test Data
  Complete survey and submit answers
  Submit invalid email
  Check privacy box
  Click submit
  Page Should Contain Element   //*[contains(text(), 'Please enter a valid email.')]
  [Teardown]    Close Application

