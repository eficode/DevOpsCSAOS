## Run locally

1. Reset postgres superuser credentials (if necessary) and create databases (must be done manually):

launch postgres:

```
$ sudo su postgres
$ psql
```

check existing users (default superuser name postgres):

```
postgres=# \du
```

change superuser password (responds with ALTER USER):

```
postgres=# ALTER USER postgres WITH PASSWORD newpassword;
```

2. Create .env file with the following content:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASS=*your password*
```

3.
```
$ npm run dev
```
