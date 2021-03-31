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
