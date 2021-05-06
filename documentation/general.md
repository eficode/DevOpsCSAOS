# General

### What parts or functionalities of the application can cause most interference or service requests?

The most heavy part of the application is the computing of results. This is described in more detail under the question "Has performance optimization been done". Otherwise, the application is quite lightweight.

### How much work the application requires currently / in the future?

Some features that are clearly needed for using the application in a real-world situation were left undone or partially undone. These are:

* multi-language support (currently the application is English-only)

* content management system

* data analytics system

The last two probably require complete separate applications. Also the performance issues in result computing probably need to be addressed before the application user experience is smooth enough for use.

Considering these points, the app probably requires some more weeks of full-time development before it can be used in a real-world situation. As for the content management and data analytics, even more work is required for making them work. However, the app can be used without them as well (content can be modified with json files and manual querying the database is possible).

### What is missing from the documentation / What could be more easily available?

The documentation is intended to contain all required information for further development of the application. 
However, some parts in the handover requirements are not addressed here, because these points have no implementation or
functionalities to document. These are: 

* logs

* monitoring

* credentials and environments (we use Heroku and Hubspot, but these will not be handed over)

* licences or certificates (we did not use any paid services in the application)

* background jobs

* backups + other emergency case procedures

### Has architecture or technology choices caused issues? What kind of?

The use of ready-built next.js caused data-fetching issues in the ci-pipeline, as next fetched data from the old application versions' heroku database during build. The issue was resolved with disabling server-side rendering by replacing getStaticProps calls with react useEffect hooks. However, this is not the way next is intended to be used, so it can cause issues later on. As most of the developers were new to next.js, these fixes are probably not ideal, but the best fixes we came up with. Therefore we cannot give a full account about what issues could arise later on.

### What deficiencies can you see in software quality?

* Database complexity

The database is quite complex for a survey application, but it was designed to be as modular as possible. Once assumptions about the final product can be made (eg. is there only one active survey at a time, or are they versioned) simplification is possible.

* Test data

Frontend, backend and end-to-end tests all have their own sets of test data with varying forms: end-to-end test data is written in SQL, other data sets in JSON. Fusing them into one test data set would simplify maintenance of tests.

* Style library mixing

The application development was started using Styled-components, but the customer requested transferring to Material UI during development. As no clear instructions on MUI implementation was given (such as how theming could be done), we used styled components to customize MUI components. One library would simplify the application.

* Frontend repository structure

The components directory in frontend requires some cleanup: some components are used on only one page, some are more widely used, such as the styled link component. These could be separated to their own directories under components/ to improve clarity.

### Has there been issues with roll back or deployments?

There have been little issues with deployments, so no roll backs have been executed during development. The only checker we had for a successful deployment was the ci-pipeline, so only the occasional manual testing was executed in the staging platform. Free version of Heroku was used as a staging platform and as deploying a docker-compose application requires a payment, we used a one-container version connected to the Heroku Postgres database. Docker-compose was only used in ci end-to-end-tests, so the composed version has not been deployed anywhere yet.



### Has performance optimization been done / needed?

free heroku on kans hidas ei tiä mist johtuu
For these reasons it is also hard to

result computing performance issues here!

### Anything else you would like to tell about the application?
