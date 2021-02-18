*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${PORT}           3000
${SERVER}         ${HOST}:${PORT}
${BROWSER}        Firefox
${DELAY}          1
${MAIN_URL}      http://${SERVER}
${VALID_EMAIL}    test2222@test.com
${INVALID_EMAIL}  invalid.email.com
${AGREE}  Agree

*** Keywords ***
Open Browser To Main Page
    Open Browser    ${MAIN_URL}/    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Main Page Should Be Open
    Title Should Be    DevOps Capability Survey

Click get started button
    Click Element    //*[contains(text(), 'Get started')]
    Sleep         1

Click next button
    Click Element    //*[contains(text(), 'Next')]
    Sleep         1

Click question option button 
    [Arguments]     ${option_id}
    Click Element   //*[contains(text(), '${option_id}')]

Click answer summary button
    Click Element   //*[contains(text(), 'Go to answer summary')]
    Sleep       3

Click go to results
    Click Element   //*[contains(text(), 'Go to your results!')]
    Sleep       3

Answer all questions
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
    Click question option button    ${AGREE}
    Click next button
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
    Location Should Contain  ${MAIN_URL}/survey/contact

Result Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/result

Open survey and insert credentials
    Open Browser To Main Page
    Click get started button
    Insert Email    ${VALID_EMAIL}
    Click begin button
    Sleep           5


