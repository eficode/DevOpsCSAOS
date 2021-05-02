*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${EMAIL}          testi@testi.fi

*** Keywords ***

Submit email
  Input Text    name=email    ${EMAIL}