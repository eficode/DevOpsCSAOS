*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${SURVEY_LENGTH}          3

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

Open survey and insert credentials
    Open Browser To Main Page
    Click get started button
    Insert Email    ${VALID_EMAIL}
    Click begin button
    Sleep           1

Click question option button 
    [Arguments]     ${option_id}
    Click Element   //*[contains(text(), '${option_id}')]