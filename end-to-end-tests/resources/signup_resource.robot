*** Settings ***
Documentation     Resource file for signup tests.
...

*** Variables ***

${VALID_EMAIL}            test2222@test.com
${EMAIL_WITHOUT_AT_SIGN}  mail.mail.com
${LONG_EMAIL}             aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
${EMAIL_IN_DATABASE}      maili@maili.com 

*** Keywords ***

Signup With Email
    [Arguments]      ${email}
    Open Browser To Main Page
    Click get started button
    Insert Email    ${email}
    Click Begin Button

Signup With Invalid Email Should Fail
    [Arguments]      ${email}
    Signup With Email   ${email}
    Alert Should Be Present
    Signup Page Should Be Open

Insert Email
    [Arguments]      ${email}
    Input Text  name:email      ${email}
