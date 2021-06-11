*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${SURVEY_LENGTH}          4
${SURVEY_PAGE_COUNT}          4

${ANSWER_IN_SUMMARY}              You answered:
${NOT_ANSWERED_IN_SUMMARY}        You haven't answered this question

@{TEST_ANSWERS_IN_SUMMARY}      ${ANSWER_IN_SUMMARY} Ehdottomasti       ${ANSWER_IN_SUMMARY} Ehka        ${ANSWER_IN_SUMMARY} Silloin talloin        ${ANSWER_IN_SUMMARY} Todellakin
@{UPDATED_ANSWERS_IN_SUMMARY}   ${ANSWER_IN_SUMMARY} Ehdottomasti       ${ANSWER_IN_SUMMARY} Ehka     ${ANSWER_IN_SUMMARY} Silloin talloin    ${ANSWER_IN_SUMMARY} No Ei

@{QUESTIONS}    ${QUESTION_1}     ${QUESTION_2}     ${QUESTION_3}     ${QUESTION_4}
${QUESTION_1}     Ajatus vihrealla nurmella villisti kierimisesta viehattaa minua
${QUESTION_2}     Suutani kuivaa tavalla, jonka voi taltuttaa vain poreileva juoma
${QUESTION_3}     Auringon nayttaytyessa ajatukseni singahtavat vappupirskeunelmiin valittomasti
${QUESTION_4}     Bilejalka vipeltaa jo vimmatusti

# option counts in current test data: q 1&2 3 options, q 3 has 6 options, q 4 has 2 options
${Q1_EHDOTTOMASTI_ID}      101
${Q2_EHKA_ID}              202
${Q3_SILLOIN_TALLOIN_ID}   303
${Q4_TODELLAKIN_ID}        401

*** Keywords ***

Open survey
    Open Browser To Main Page

Select option 
    [Arguments]   ${option_id}
    Wait Until Page Contains Element        id:${option_id}
    Click Element	 id:${option_id}

Answer all questions
    Wait Until Page Contains Element        id:${Q1_EHDOTTOMASTI_ID}
    Select option   ${Q1_EHDOTTOMASTI_ID}
    Wait Until Page Contains Element        id:${Q2_EHKA_ID}
    Select option   ${Q2_EHKA_ID}
    Wait Until Page Contains Element        id:${Q3_SILLOIN_TALLOIN_ID}
    Select option   ${Q3_SILLOIN_TALLOIN_ID}
    Wait Until Page Contains Element        id:${Q4_TODELLAKIN_ID}
    Select option   ${Q4_TODELLAKIN_ID}

Answer all questions on first page
    Wait Until Page Contains Element        id:${Q1_EHDOTTOMASTI_ID}
    Select option   ${Q1_EHDOTTOMASTI_ID}

Open survey and answer some questions
    Open survey
    Click next button   2
    Wait Until Page Contains Element        id:${Q2_EHKA_ID}
    Select option   ${Q2_EHKA_ID}
    Click next button   4
    Wait Until Page Contains Element        id:${Q4_TODELLAKIN_ID}
    Select option   ${Q4_TODELLAKIN_ID}
    
Complete survey
    Open survey
    Answer all questions

Complete survey and submit answers
    Open survey
    Answer all questions
    Click go to results and wait

Summary Page Should Contain Selected Answers
    [Arguments]  @{ANSWERS_IN_SUMMARY}
    FOR   ${index}   IN RANGE  0   ${SURVEY_LENGTH} - 1
      Wait Until Element contains    //*[contains(text(), '${QUESTION_1}')]/following-sibling::span    ${UPDATED_ANSWERS_IN_SUMMARY}[0] 
      Element Should Contain  //*[contains(text(), '${QUESTIONS}[${index}]')]/following-sibling::span   ${ANSWERS_IN_SUMMARY}[${index}]      
    END
