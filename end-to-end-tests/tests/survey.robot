*** Settings ***
Documentation   For testing survey
Resource        ../resources/db_resource.robot
Resource        ../resources/url_navigation_resource.robot
Resource        ../resources/signup_resource.robot
Resource        ../resources/survey_resource.robot

*** Variables ***

${VALID_EMAIL}            test2222@test.com
${EMAIL_WITHOUT_AT_SIGN}  mail.mail.com
${LONG_EMAIL}             aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
${EMAIL_IN_DATABASE}      maili@maili.com 

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

# BUG: test inputs options to be chosen in email input field
# Answers Can Be Submitted When All Questions Are Answered
#  [Setup]       Seed Database With Test Data
#  [Template]    Signup With Invalid Email Should Fail
#  ${MID_SURVEY_UNANSWERED}
#  [Teardown]    Close Application


# Clicking Contact In Result Opens Email With Sender And Recipient Auto-filled
