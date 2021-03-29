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

# BUG: selenium does not allow identifying option buttons....
# Answers Can Be Submitted When All Questions Are Answered
#  [Setup]       Seed Database With Test Data
#  [Template]    Complete survey and submit answers
#  ${START_OF_SURVEY_UNANSWERED}
#  ${MID_SURVEY_UNANSWERED}
#  ${END_OF_SURVEY_UNANSWERED}
#  [Teardown]    Close Application

# Clicking Contact In Result Opens Email With Sender And Recipient Auto-filled

# User is auto-redirected to next page when all questions on page are answered

# User is not auto-redirected to next page in survey after summary has been visited
