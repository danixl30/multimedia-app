# Getting started with monorepo

## Description

Monorepo [TypeScript](https://www.typescriptlang.org/) starter with [Express](https://expressjs.com/) and [React](https://reactjs.org/). The package manager is [pnpm](https://pnpm.io/). You need [NodeJs](https://nodejs.org/en/) >=20.11.0. 

## Setup

Please create .env files inside /apps/api and /apps/client folders. You can use .env.example file to guide.

## API endpoints

[POST] /api/user Create user
``` json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "type": ["ADMIN", "READER", "CREATOR"]
}
```
[GET] /api/user/current Get current user by token, headers:
``` json
{
    "authorization": "Bearer token"
}
```
[POST] /api/user/login user login
``` json
{
    "email": "string",
    "password": "string"
}
```
[POST] /api/category Create category
``` json
{
    "headers": {
        "authorization": "Bearer token"
    },
    "body": {
        "name": "string",
        "image": "string"
    }
}
```
[GET] /api/category/many Get all categories
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```
[GET] /api/category/:id Get single category
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```
[GET] /api/category/count/content Count contents per category
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```
[POST] /api/theme Create theme
``` json
{
    "headers": {
        "authorization": "Bearer token"
    },
    "body": {
        "name": "string",
        "categories": ["string"]
    }
}
```
[GET] /api/theme/many Get all themes
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```
[GET] /api/theme/:id Get single theme
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```
[GET] /api/theme/count/content Count contents per theme
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```
[POST] /api/content Create content
``` json
{
    "headers": {
        "authorization": "Bearer token"
    },
    "body": {
        "title": "string",
        "picture": "string",
        "theme": "string",
        "medias": [{
            "category": "string",
            "body": "string"
        }]
    }
}
```
[GET] /api/content/many Get contents all or paginated
``` json
{
    "headers": {
        "authorization": "Bearer token"
    },
    "queryParams": {
        "page": "number",
        "perPage": "number",
        "title": "string",
        "theme": "string"
    }
}
```
[GET] /api/content/calculate/pagination Calculate contents pagination
``` json
{
    "headers": {
        "authorization": "Bearer token"
    },
    "queryParams": {
        "perPage": "number",
        "title": "string",
        "theme": "string"
    }
}
```
[GET] /api/content/:id Get single content
``` json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
```

## node installation by nvm
```bash
# windows
$ nvm install $(Get-Content .nvmrc).replace( 'v', '' )

# bash
$ nvm install
```

## pnpm installation 
```bash
# enable corepack
$ corepack enable

# Or install pnpm by npm
$ npm install -g pnpm
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Lint
```bash
# run lint with eslint
$ pnpm lint
```

## Format
```bash
# format all with prettier
$ pnpm format
```

## Test

```bash
# unit tests
$ pnpm run test:unit
```

## License

- Nest is [MIT licensed](LICENSE).
- [React](https://github.com/facebook/react/)
- [pnpm](https://github.com/pnpm/pnpm)



## Authors

- [@danixl30](https://github.com/danixl30)

