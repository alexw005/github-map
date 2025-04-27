## The Objective of this project

This is to show the number of github users in each country in world map by using the
[Github API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#list-users)

With `React-Leaflet` library, this task has been made easy.

## Backend

For a quick implementation you may use github API directly.

However this current project is to show case how we can connect to Python FastApi, which is located in this [Github Backend Repo](https://github.com/alexw005/ghmap-backend)

## The Architect of the entire project

These are all containerized and deployed with Kubernetes, pods, Ingress, services, etc.

We have a pod for OAuth authentication The Kubernetes cluster is using oauth2proxy for OAuth authentication that facilitates the login process between different pods and services with an Ingress setup. Refer to the [GitHub Backend Repo](https://github.com/alexw005/ghmap-backend) and [Oauth2proxy Documentation](https://oauth2-proxy.github.io/oauth2-proxy/)

## Testing library

TBD

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Welcome to the hosted web for testing

You are welcome to test the web application [Github mao](https://ghmap.fswoon.au)

You will be prompt to login with your github account.

Disclaimer: We do not store any information of the users.
