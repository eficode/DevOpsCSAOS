## Run locally

1. Reset postgres superuser credentials (if necessary) and create databases (must be done manually):

launch postgres:

```
$ sudo su postgres
$ psql
```

check existing users (default superuser name postgres):

```
postgres=# \dt
```

change superuser password (responds with ALTER USER):

```
postgres=# ALTER USER postgres WITH PASSWORD newpassword;
```

2. Create .env file with the following content:

DB_HOST=localhost
DB_USER=postgres
DB_PASS=*your password*

3.
```
$ npm run dev
```

## Docker

Backend does *not* yet function correctly with Docker.

To build and access a WIP container you need to have Docker installed, and might need sudo-privileges.

Container can be built by using the command:
```
$ docker build . -t csaos-backend
```
Container can be run and accessed with the command:
```
$ docker container run -it csaos-backend
```
You will be presented with a bash-terminal running as root in the container. You can troubleshoot dependency issues etc. here, for now.
