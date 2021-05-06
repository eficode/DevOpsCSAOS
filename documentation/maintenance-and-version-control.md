# Maintenance and version control

to do: add instructions for adding questions etc. to application with json files + note that jsons are not validated

## General maintence instructions: managing survey content

The survey content is read from `backend/config/initialData`. The current JSON files are set as an example of the data format required, more detailed database models can be found on `backend/config/models`, JSON files correspond these models without ids and timestamps.

The application has no JSON file validation, and if any of the initial data files fails a validation constraint set by the database models, the backend will not start.

! Note: currently, for easing the development, database contents are reset to only contain initial data every time backend is re-deployed. This is done in `backend/config/setUpdatabase:L28`. The database was designed in a way that allows multiple versions of the survey to be added without old answers to old sets of questions getting corrupted, but this has not been tested to ensure the versioning works as intended. 


