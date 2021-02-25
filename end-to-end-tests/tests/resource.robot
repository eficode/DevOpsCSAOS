*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary
Library           Process


*** Variables ***
${HOST}           localhost
${PORT}           5001
${SERVER}         ${HOST}:${PORT}
# Change browser to firefox to see test run
${BROWSER}        headlessfirefox
${DELAY}          1
${MAIN_URL}       http://${SERVER}
${VALID_EMAIL}    test2222@test.com
${VALID_EMAIL_2}  test0000@test.co
${INVALID_EMAIL}  invalid.email.com
${EMAIL_IN_USE}   testaaja1@email.com
${SURVEY_LENGTH}  10
# Below: texts in buttons
${START_SURVEY}   Get started
${NEXT}           Next  
${AGREE}          Agree
${GO_TO_SUMMARY}  Review
${GO_TO_RESULTS}  Submit answers

*** Keywords ***

Open Browser To Main Page
    Open Browser    ${MAIN_URL}/    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Main Page Should Be Open
    Title Should Be    DevOps Capability Survey

Click get started button
    Click Element    //*[contains(text(), '${START_SURVEY}')]
    Sleep         1

Click next button
    Click Element    //*[contains(text(), '${NEXT}')]
    Sleep         1

Click question option button 
    [Arguments]     ${option_id}
    Click Element   //*[contains(text(), '${option_id}')]

Click answer summary button
    Click Element   //*[contains(text(), '${GO_TO_SUMMARY}')]
    Sleep       3

Click go to results
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]
    Sleep       3

Answer all questions
    FOR    ${index}    IN RANGE    1    ${SURVEY_LENGTH}
        Click question option button    ${AGREE}
        Click next button
    END
    Click question option button    ${AGREE}

Click begin button
    Click Element    //*[contains(text(),'Begin')]  
    Sleep         1   

Insert Email
    [Arguments]      ${email}
    Input Text  name:email      ${email}

Questions Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/1

Contact Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/signup

Result Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/result

Open survey and insert credentials
    Open Browser To Main Page
    Click get started button
    Insert Email    ${VALID_EMAIL_2}
    Click begin button
    Sleep           5
