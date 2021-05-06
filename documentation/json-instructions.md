# Instructions for JSON files

Data is added to the survey through JSON files.

## 1. Adding surveys
Surveys can be added in the ***surveys.json*** file by specifying the survey’s *id* and *name*. For example:
```
  {
    "id": 1,
    "name": "New"
  },
```

## 2. Adding categories
Question categories can be added in the ***categories.json*** file by specifying the category’s *id*, *name*, and *description*. For example:
```
  {
    "id": 1,
    "name": "Culture",
    "description": "Culture category is for company culture related questions."
  },
```

Categories also require result texts, which can be added in the ***category_results.json*** file. The *text* field contains the result text shown to the user, *categoryId* links the result text to a category through the category’s id, and *cutoff_from_maxpoints* determines the maximum percentage of points for the result text. For example:
```
  {
    "text": "Your company culture does not yet support good DevOps practices. However, consulting can help you to improve your culture with little investment.",
    "categoryId": 1,
    "cutoff_from_maxpoints": 0.4
  },
```

## 3. Adding questions
Questions can be added in the ***questions.json*** file. The *text* field contains the question text, *surveyId* links the question to a survey through the survey’s id, and *categoryId* links the question to a category through the category’s id. For example:
```
  {
    "id": 1,
    "text": "Is your team continuously looking to improve?",
    "surveyId": 1,
    "categoryId": 1
  },
```

Questions also require answer options. These are added in the ***question_answers.json*** file. *questionId* links the option to a question through the question’s id, *text* contains the option’s text value, and *points* contain the points awarded to the user for selecting the option.
```
  {
    "id": 1,
    "questionId": 1,
    "text": "Yes",
    "points": 5
  },
```

## 4. Adding industries
The user can select their industry when submitting their email for detailed results. Industries can be added in the ***industries.json*** file by specifying the *name* of the industry. For example:
```
  {
    "name": "Operating systems"
  },
```
