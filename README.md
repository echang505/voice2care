# voice2care

## Development: 
### How to set up Dev Environment:
1. Install and Setup WSL2
2. Update packages
> sudo apt update
> sudo apt upgrade
3. Install Node
> sudo apt install npm

## Dev Dockerized Build
Only need to run this one command for hot reload backend, frontend, and nginx reverse proxy
> docker compose -f docker-compose.dev.yml up --build
No cache:
> docker compose -f docker-compose.dev.yml build --no-cache
> docker compose -f docker-compose.dev.yml up


### Start individual components
##### How to start frontend hot reload
1. Go to frontend directory
> cd frontend
2. Install packages
> npm install
3. Run Dev Server through Vite
> npm run dev

##### How to start backend hot reload
1. Go to backend directory
> cd backend
2. Install packages
> npm install
3. Run Dev server through nodemon
> npm run dev:hot


## Prod build:
1. Download Docker Desktop w/ WSL2 integration
2. Build Docker Image
> docker compose build
3. Run Docker Image
> docker compose up -d
4. Access site: [localhost](http://localhost/), proxy to api http://localhost/api/