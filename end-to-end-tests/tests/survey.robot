*** Settings ***
Documentation   For testing survey
Resource        ../resources/db_resource.robot
Resource        ../resources/url_navigation_resource.robot
Resource        ../resources/survey_resource.robot

*** Test Cases ***

Answering Questions Updates Summary
  [Setup]       Seed Database With Test Data
  Complete survey
  Summary Page Should Be Open
  Sleep    1s
  Summary Page Should Contain Selected Answers    @{TEST_ANSWERS_IN_SUMMARY}
  [Teardown]    Close Application

Changing An Answer Updates Summary
  [Setup]       Seed Database With Test Data
  Complete survey
  Summary Page Should Contain Selected Answers    @{TEST_ANSWERS_IN_SUMMARY}
  Go Back
  Select option   402
  Click answer summary button
  Summary Page Should Contain Selected Answers    @{UPDATED_ANSWERS_IN_SUMMARY}
  [Teardown]    Close Application

Result Page Is Shown When All Answers Are Submitted
  [Setup]       Seed Database With Test Data
  Complete survey
  Click go to results and wait
  Result Page Should Be Open
  [Teardown]    Close Application

Alert Is Shown Instead Of Result Page When There Are Unanswered Questions
  [Setup]       Seed Database With Test Data
  Open survey and answer some questions
  Click go to results
  Alert Should Be Present
  [Teardown]    Close Application

User Is Auto-redirected To Next Page When All Questions On Page Are Answered
  [Setup]       Seed Database With Test Data
  Open survey
  Answer all questions on first page
  Second page of survey should be open
  [Teardown]    Close Application

User Is Not Auto-redirected To Next Page In Survey After Summary Has Been Visited
  [Setup]       Seed Database With Test Data
  Complete survey
  Go Back
  Select option   401
  Last page of survey should be open
  [Teardown]    Close Application
