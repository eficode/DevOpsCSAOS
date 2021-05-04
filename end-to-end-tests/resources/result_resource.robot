*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${EMAIL}          testi3@testi.fi
${INVALID_EMAIL}          testi3testi.fi

*** Keywords ***

Submit email
  Input Text    name=email    ${EMAIL}

Submit invalid email
  Input Text    name=email    ${INVALID_EMAIL}

Check privacy box
  Select Checkbox    xpath=//input[@name='acceptPrivacyPolicy']