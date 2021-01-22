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
