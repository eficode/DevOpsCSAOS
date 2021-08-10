*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${SURVEY_LENGTH}          16
${SURVEY_PAGE_COUNT}          16

${ANSWER_IN_SUMMARY}              You answered:
${NOT_ANSWERED_IN_SUMMARY}        You haven't answered this question



*** Keywords ***

Open survey
    Open Browser To Main Page

Close Application
    Close Browser

Select option 
    [Arguments]   ${option_id}
    Click Element	 id:${option_id}
    Sleep    0.4s

Answer all questions
    ${counter}=   Set Variable    1
    FOR    ${index}    IN RANGE    16
        ${idnumber}=   Evaluate   ${counter} * 5
        Select option    ${idnumber}
        ${counter}=   Evaluate   ${counter} + 1
        Exit For Loop If    ${index} == 15
    END
    Current Frame Should Contain   Here are your current answers


Answer some questions
     ${counter}=   Set Variable    2
    FOR    ${index}    IN RANGE    16
        Click Element    //*[contains(text(), '${NEXT}')]
        Sleep    0.4s
        ${idnumber}=   Evaluate   ${counter} * 5
        Select option    ${idnumber}
        ${counter}=   Evaluate   ${counter} + 2
        Exit For Loop If    ${index} == 7
    END
    Current Frame Should Contain   Here are your current answers
    # Sleep    0.5s
    # Unselect Frame
    # Click Element    //*[contains(text(), '${GO_TO_RESULTS}')]
    

Summary Page Should Contain Selected Answers
    [Arguments]  @{ANSWERS_IN_SUMMARY}
    FOR   ${index}   IN RANGE  0   ${SURVEY_LENGTH} - 1
      Wait Until Element contains    //*[contains(text(), '${QUESTION_1}')]/following-sibling::span    ${UPDATED_ANSWERS_IN_SUMMARY}[0] 
      Element Should Contain  //*[contains(text(), '${QUESTIONS}[${index}]')]/following-sibling::span   ${ANSWERS_IN_SUMMARY}[${index}]      
    END


