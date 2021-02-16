*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${SERVER}         ${HOST}:5000
${BROWSER}        Firefox
${DELAY}          1
${MAIN URL}      http://${SERVER}/

*** Keywords ***
Open Browser To Main Page
    Open Browser    ${MAIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Main Page Should Be Open
    Title Should Be    DevOps Capability Surve

