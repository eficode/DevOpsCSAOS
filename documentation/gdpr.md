# GDPR

## Liability

As this application stores personal data, anyone who hosts this application is responsible of ensuring that the use of the application is GDPR compliant. The host of this application is also responsible of taking care of all necessary data safety measures when sending and storing the data. This application is provided as plain source code and the development team takes absolutely no liability of any possible data breaches when hosting this application.

If this application is hosted outside of the European Union, the host is responsible of complying to the local legislation concerning data protection.

## Collected data under GDPR

The application collects user emails. These emails are saved on form submit (in frontend/components/getDetailedResultsForm) in the browser session storage and to the database. Other application state information is also stored in session storage, but this data is not personal.

## Anonymization of result data

The results for an individual user are computed using data that only points to users with ids, so it is possible to extract data for statistics from database without compromising users' personal emails. Personal data is only stored in table Users, whereas general result analytics desired can be computed without using data from the Users table. When computing industry and group-specific results, users table is needed, but only the industryId and groupId attributes can be used.

## Other issues

Other issues related to GDPR, such as personal data deleting and data in APIs was agreed to not be addressed in this phase of development.
