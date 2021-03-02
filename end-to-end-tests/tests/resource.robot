*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
Library           SeleniumLibrary
Library           DatabaseLibrary


*** Variables ***
${HOST}           localhost
${PORT}           5001
${SERVER}         ${HOST}:${PORT}
# Change browser to firefox to see test run, headlessfirefox to run headless
${BROWSER}                firefox
${DELAY}                  1
${MAIN_URL}               http://${SERVER}

${VALID_EMAIL}            test2222@test.com
${EMAIL_WITHOUT_AT_SIGN}  mail.mail.com
${LONG_EMAIL}             aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
${EMAIL_IN_DATABASE}      maili@maili.com 
${SURVEY_LENGTH}          3

# Below: texts in buttons
${START_SURVEY}     Get started
${NEXT}             Next  

${STRONGLY_AGREE}                 Strongly agree
${AGREE}                          Agree
${NEUTRAL}                        Neutral
${DISAGREE}                       Disagree
${STRONGLY_DISAGREE}              Strongly disagree

${STRONGLY_AGREE_IN_SUMMARY}      You strongly agree
${AGREE_IN_SUMMARY}               You agree
${NEUTRAL_IN_SUMMARY}             You feel neutral
${DISAGREE_IN_SUMMARY}            You disagree
${STRONGLY_DISAGREE_IN_SUMMARY}   You strongly disagree
${NOT_ANSWERED_IN_SUMMARY}        You haven's answered this question

${GO_TO_SUMMARY}    Review
${GO_TO_RESULTS}    Submit answers

@{TEST_ANSWERS}                 ${AGREE}    ${NEUTRAL}    ${STRONGLY_DISAGREE}
@{TEST_ANSWERS_IN_SUMMARY}      ${AGREE_IN_SUMMARY}       ${NEUTRAL_IN_SUMMARY}   ${STRONGLY_DISAGREE_IN_SUMMARY}
@{UPDATED_ANSWERS_IN_SUMMARY}   ${AGREE_IN_SUMMARY}       ${NEUTRAL_IN_SUMMARY}   ${STRONGLY_AGREE_IN_SUMMARY}
@{MID_SURVEY_UNANSWERED}        ${AGREE}    ${EMPTY}      ${NEUTRAL}
@{FIRST_QUESTION_UNANSWERED}    ${EMPTY}    ${AGREE}      ${DISAGREE}
@{LAST_QUESTION_UNANSWERED}     ${DISAGREE} ${NEUTRAL}    ${EMPTY}

${QUESTION_1}     Ajatus vihreällä nurmella villisti kierimisestä viehättää minua
${QUESTION_2}     Suutani kuivaa tavalla, jonka voi taltuttaa vain poreileva juoma
${QUESTION_3}     Auringon näyttäytyessä ajatukseni singahtavat vappupirskeunelmiin välittömästi
@{QUESTIONS}      ${QUESTION_1}   ${QUESTION_2}   ${QUESTION_3}

*** Keywords ***

Signup With Invalid Email Should Fail
    [Arguments]      ${email}
    Open Browser To Main Page
    Click get started button
    Insert Email    ${email}
    Click Begin Button
    Signup Page Should Be Open

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
    Sleep       1

Click go to results
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]
    Sleep       1

Submit Disabled When Some Questions Not Answered
    [Arguments]   @{options}
    Complete survey and go to summary   @{options}
    Click go to results
    Alert Should Be Present

Answer all questions
    [Arguments]   @{OPTIONS}
    FOR    ${index}    IN RANGE    0    ${SURVEY_LENGTH} - 1
        Click question option button    ${OPTIONS}[${index}]
        Click next button
    END
    Click question option button    ${OPTIONS}[2]

Summary Page Should Contain Selected Answers
    [Arguments]  @{ANSWERS_IN_SUMMARY}
    FOR   ${index}   IN RANGE  0   ${SURVEY_LENGTH} - 1
      Element Should Contain  //*[contains(text(), '${QUESTIONS}[${index}]')]   ${ANSWERS_IN_SUMMARY}[${index}]      
    END

Complete survey and go to summary
    [Arguments]   @{answers}
    Open survey and insert credentials
    Answer all questions      @{answers}
    Click answer summary button

Go back to last question
    Go Back

Click begin button
    Click Element    //*[contains(text(),'Begin')]  
    Sleep         1   

Insert Email
    [Arguments]      ${email}
    Input Text  name:email      ${email}

Open survey and insert credentials
    Open Browser To Main Page
    Click get started button
    Insert Email    ${VALID_EMAIL}
    Click begin button
    Sleep           1

Questions Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/1

Signup Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/signup

Summary Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/summary

Result Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/result
