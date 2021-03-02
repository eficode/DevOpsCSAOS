*** Settings ***
Documentation   For testing survey
Resource        resource.robot

*** Test Cases ***

Answering Questions Updates Summary
  [Setup]       Seed Database With Test Data
  Complete survey and go to summary     @{TEST_ANSWERS}
  Summary Page Should Contain Selected Answers    @{TEST_ANSWERS_IN_SUMMARY}
  [Teardown]    Close Application

Changing An Answer Updates Summary
  [Setup]       Seed Database With Test Data
  Complete survey and go to summary     @{TEST_ANSWERS}
  Summary Page Should Contain Selected Answers    @{TEST_ANSWERS_IN_SUMMARY}
  Go Back
  Click question option button   ${STRONGLY_AGREE}
  Click answer summary button
  Summary Page Should Contain Selected Answers    @{UPDATED_ANSWERS_IN_SUMMARY}
  [Teardown]    Close Application

Answers Can Be Submitted When All Questions Are Answered
  [Setup]       Seed Database With Test Data
  [Template]    Signup With Invalid Email Should Fail
  ${MID_SURVEY_UNANSWERED}
 [Teardown]    Close Application




#Clicking Contact In Result Opens Email With Sender And Recipient Auto-filled
