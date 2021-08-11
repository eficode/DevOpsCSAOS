*** Settings ***
Documentation     Resource file for opening URLs and assertions of various pages being open.
...
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${PORT}           3000
${SERVER}         ${HOST}:${PORT}
# Change browser to firefox to see test run, headlessfirefox to run headless
${BROWSER}                chrome
${MAIN_URL}               https://${SERVER}
${VALID_EMAIL}            test2222@test.com

${BEGIN}                Begin
${START_SURVEY}         Get started
${NEXT}                 Next  
${GO_TO_SUMMARY}        Review
${GO_TO_RESULTS}        Submit answers
${TO_PRIVACY_POLICY}    Privacy policy
${BACK_TO_SURVEY}       Back to result page
${SUBMIT_EMAIL}         Submit
${EMAIL_COMPLETE}       Thank you

*** Keywords ***

Open Browser To Main Page
    Open Browser    ${MAIN_URL}/    ${BROWSER}
    Wait Until Location Contains    ${SERVER}
    Wait Until Page Contains Element    //*[contains(text(), 'DevOps self-assessment')]

Privacy Policy Page Should Be Open
    Location Should Contain  https://www.eficode.com/privacy-policy

Click next button
    [Arguments]   ${next_page_id}
    Wait Until Page Contains Element    //*[contains(text(), '${NEXT}')]
    Click Element    //*[contains(text(), '${NEXT}')]
    Wait Until Location Contains    ${MAIN_URL}/survey/questions/?id=${next_page_id}

Click answer summary button
    Wait Until Page Contains Element    //*[contains(text(), '${GO_TO_SUMMARY}')]
    Click Element   //*[contains(text(), '${GO_TO_SUMMARY}')]
    Wait Until Location Contains    /survey/questions/summary

Click go to results and wait
    Wait Until Page Contains Element    //*[contains(text(), '${GO_TO_RESULTS}')]
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]
    Wait Until Location Contains    /survey/result       20

Click go to results
    Wait Until Page Contains Element    //*[contains(text(), '${GO_TO_RESULTS}')]
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]

Click privacy policy link and wait
    ${Current_window}        Get Locations
    Click Element   //*[contains(text(), '${TO_PRIVACY_POLICY}')]
    Sleep   3s
    ${New_Windows_list}      Get Locations
    Should Not Be Equal      ${Current_window}    ${New_Windows_list}
    Should Contain    ${New_Windows_list}    https://www.eficode.com/privacy-policy    case_insensitive=yes


Click back to results link and wait
    Click Element   //*[contains(text(), '${BACK_TO_SURVEY}')]
    Wait Until Location Contains    ${MAIN_URL}/survey/result 

Click submit
    Wait Until Page Contains Element    //*[contains(text(), '${SUBMIT_EMAIL}')]
    Click Element   //*[contains(text(), '${SUBMIT_EMAIL}')]

Click submit and wait
    Click Element   //*[contains(text(), '${SUBMIT_EMAIL}')]
    Wait Until Page Contains Element    //*[contains(text(), '${EMAIL_COMPLETE}')]