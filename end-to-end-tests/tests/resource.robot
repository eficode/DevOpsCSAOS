*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${PORT}           5000
${SERVER}         ${HOST}:${PORT}
${BROWSER}        Firefox
${DELAY}          0
${MAIN_URL}      http://${SERVER}
${VALID_EMAIL}    test@test.com
${INVALID_EMAIL}  invalid.email.com
${STRONGLY_AGREE}  Strongly agree

*** Keywords ***
Open Browser To Main Page
    Open Browser    ${MAIN_URL}/    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Main Page Should Be Open
    Title Should Be    DevOps Capability Survey

Click get started button
    Click Element    get-started
    Sleep         1

Click next button
    Click Element    next
    Sleep         1

Click question option button 
    [Arguments]     ${option_id}
    Click Element   ${option_id}

Click answer summary button
    Click Element   answer-summary-button
    Sleep       4

Click go to results
    Click Element   go-to-results

Answer all questions
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}
    Click next button
    Click question option button    ${STRONGLY_AGREE}

Click begin button
    Click Element    submit-email-button  
    Sleep         1   

Insert Email
    [Arguments]      ${email}
    Input Text       email      ${email}

Questions Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/1

Contact Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/contact

Result Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/result

Open survey and insert credentials
    Open Browser To Main Page
    Click get started button
    Insert Email    ${VALID_EMAIL}
    Click begin button


