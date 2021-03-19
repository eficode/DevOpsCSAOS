*** Settings ***
Documentation     Resource file for opening URLs and assertions of various pages being open.
...
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${PORT}           5001
${SERVER}         ${HOST}:${PORT}
# Change browser to firefox to see test run, headlessfirefox to run headless
${BROWSER}                firefox
${DELAY}                  1
${MAIN_URL}               http://${SERVER}
${VALID_EMAIL}            test2222@test.com

${BEGIN}            Begin
${START_SURVEY}     Get started
${NEXT}             Next  
${GO_TO_SUMMARY}    Review
${GO_TO_RESULTS}    Submit answers

*** Keywords ***

Open Browser To Main Page
    Open Browser    ${MAIN_URL}/    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Main Page Should Be Open
    Title Should Be    DevOps Capability Survey

Questions Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/?id=1

Signup Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/signup

Summary Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/summary

Result Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/result

Click get started button
    Click Element    //*[contains(text(), '${START_SURVEY}')]
    Sleep         1

Click begin button
    Click Element    //*[contains(text(),'${BEGIN}')]  
    Sleep         1 

Click next button
    Click Element    //*[contains(text(), '${NEXT}')]
    Sleep         1

Click answer summary button
    Click Element   //*[contains(text(), '${GO_TO_SUMMARY}')]
    Sleep       1

Click go to results
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]
    Sleep       1
