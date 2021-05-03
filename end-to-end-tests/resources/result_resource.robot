*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${EMAIL}          testi3@testi.fi

*** Keywords ***

Submit email
  Input Text    name=email    ${EMAIL}

Check privacy box
  Select Checkbox    xpath=//input[@name='acceptPrivacyPolicy']