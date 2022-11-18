# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:JohnySpice/nodejs2022Q2-service.git
```

## Installing docker

```
https://docs.docker.com/get-docker/
```

## Running application
Rename .env-example to .env

Rename .env-example to .env or add .env file with corresponding values

Type in terminal

```
docker-compose up -d --build
```

After building containers, will start migration for creating db entites and starting app

## Testing

After application running you can start tests inside app container (connect to container in interctive mode) or install node_modules (npm install) localy and start tests.

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
