# Testing

to add?: every test set uses its own test data -> this could be improved by creating one set of test data

## Frontend

Jest is used for frontend testing. Frontend tests are used to make sure pages are rendered as intended. Frontend tests cover tests for question, result and summary pages.

Run tests locally:

- Run in frontend directory to run tests

```
npm run test
```

## Backend

Jest and Supertest are used for backend testing. Backend testing covers endpoints for answers, email submit, questions and users. In individual tests, Supertest provides with response from the endpoint and both response body and HTTP status can be tested.

Run tests locally:

- Run in backend directory to run tests

```
npm run test
```

## End-to-end

Robotframework is used for end-to-end testing. See instructions for installation [here](https://github.com/Devops-ohtuprojekti/DevOpsCSAOS/blob/01f791b8c28f2ecc448c3427395d66bb93ffeb52/end-to-end-tests/README.md)

End-to-end tests are used to simulate real user scenarios and test the application from beginning to end. They make sure the application works as intended. Test cases covered include for example result page being shown when all answers to survey are submitted, alert is shown instead of result page when there are unanswered questions, and user is auto-directed to next page when all questions on page are answered.

Run tests locally:

1. Run in project root to start application in test mode

```
npm run start:robot
```

2. Activate virtual env in end-to-end directory

```
source env/bin/activate
```

3. Run in end-to-end directory to run tests

```
robot tests
```
