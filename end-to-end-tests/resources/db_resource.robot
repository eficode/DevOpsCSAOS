*** Settings ***
Documentation     Resource file for database operations.
...
Library           DatabaseLibrary
*** Variables ***
${DB_CONFIG_FILE}   resources/db.cfg

*** Keywords ***

Modify Database
    [Arguments]   @{SCRIPTS}
    Connect To Database    dbConfigFile=./${DB_CONFIG_FILE}
    FOR   ${script}   IN   @{SCRIPTS}
        Execute Sql Script    ${script}
    END
    Disconnect From Database

Seed Database With Test Data And A User
    Modify Database       clear_database.sql   seed_database.sql   user_to_database.sql

Seed Database With Test Data
    Modify Database       clear_database.sql   seed_database.sql

Empty Test Database
    Modify Database       clear_database.sql

Close Application
    Close Browser
    Empty Test Database
