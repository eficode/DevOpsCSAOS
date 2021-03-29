*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${SURVEY_LENGTH}          2

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
${NOT_ANSWERED_IN_SUMMARY}        You haven't answered this question

# SeleniumLibrary has little support locating option buttons
# (many 'Agree' buttons etc. and no way found to locate other buttons than the first)
@{TEST_ANSWERS}                 ${AGREE}    ${NEUTRAL}
@{TEST_ANSWERS_IN_SUMMARY}      ${AGREE_IN_SUMMARY}       ${NOT_ANSWERED_IN_SUMMARY}     ${NEUTRAL_IN_SUMMARY}    ${NOT_ANSWERED_IN_SUMMARY}
@{UPDATED_ANSWERS_IN_SUMMARY}   ${AGREE_IN_SUMMARY}       ${NOT_ANSWERED_IN_SUMMARY}     ${STRONGLY_AGREE_IN_SUMMARY}    ${NOT_ANSWERED_IN_SUMMARY}
@{MID_SURVEY_UNANSWERED}        ${AGREE}    ${EMPTY}      ${NEUTRAL}
@{FIRST_QUESTION_UNANSWERED}    ${EMPTY}    ${AGREE}      ${DISAGREE}
@{LAST_QUESTION_UNANSWERED}     ${DISAGREE} ${NEUTRAL}    ${EMPTY}

@{QUESTIONS}    ${QUESTION_1}     ${QUESTION_2}     ${QUESTION_3}     ${QUESTION_4}
${QUESTION_1}     Ajatus vihrealla nurmella villisti kierimisesta viehattaa minua
${QUESTION_2}     Suutani kuivaa tavalla, jonka voi taltuttaa vain poreileva juoma
${QUESTION_3}     Auringon nayttaytyessa ajatukseni singahtavat vappupirskeunelmiin valittomasti
${QUESTION_4}     Bilejalka vipeltaa jo vimmatusti

*** Keywords ***
Submit Disabled When Some Questions Not Answered
    [Arguments]   @{answers}
    Complete survey and go to summary   @{answers}
    Click go to results
    Alert Should Be Present

Answer all questions
    [Arguments]   @{OPTIONS}
    Click question option button    ${OPTIONS}[0]
    Click next button     2
    Click question option button    ${OPTIONS}[1]

Summary Page Should Contain Selected Answers
    [Arguments]  @{ANSWERS_IN_SUMMARY}
    FOR   ${index}   IN RANGE  0   ${SURVEY_LENGTH} - 1
      Element Should Contain  //*[contains(text(), '${QUESTIONS}[${index}]')]   ${ANSWERS_IN_SUMMARY}[${index}]      
    END

Complete survey and go to summary
    [Arguments]   @{answers}
    Open survey
    Answer all questions      @{answers}
    Click answer summary button

Open survey
    Open Browser To Main Page
    Click get started button

Click question option button 
    [Arguments]   ${option_id}
    Click Element	  //*[contains(text(), '${option_id}')]