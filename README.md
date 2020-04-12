[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Build and deploy](https://github.com/Els-Illencs/hackovid/workflows/Build%20and%20publish%20to%20Heroku/badge.svg?branch=master)

# Hackovid
Web application to buy from different local shops using a single order. It is optimized to choose the nearest shops to users' home, so they help small businesses.

## Project's structure
Components:
* [Front](front). Web App.
* [Back](back). API.
* [Postgres](postgres). Initialization script for the Postgres DB.

Others:
* [License](LICENSE)
* [GitHub workflow](.github/workflows.main.yml). Workflow executed by GitHub when a new commit is pushed. It deploys the app to the live environment.

## Environments
To ensure consistency across environments and setups, we use [Docker](https://www.docker.com/). This allow us to be sure that we have a repeatable environment and it simplifies the deployment to the live environment.
### Local environment
To execute this project in your own computer, download this repository and in its root folder execute the following command: 
```
docker-compose up --build --remove-orphans
```

The above command build and runs the web app, the backend API and a PostgreSQL database.

To access to the web app, open a browser and go to http://localhost:7000.

### Production
The live environment is hosted in [Heroku](https://www.heroku.com/), using the same Docker images that we use in our local environment.

The web app public URL is [this one](https://hackovid-els-illencs-front.herokuapp.com/).

#### Deployment to Production
We use [GitHub Actions](https://github.com/features/actions) to deploy the app to the live environment. When a commit is pushed to the `master` branch, the code is built into two Docker images (one for the front and the other for the back) and then they are pushed to Heroku.

This strategy (which follows the Continuous Integration and Continuous Delivery pratices) allows us to be agile and stay lean.

## Authors
* **Llorenç Seguí Capllonch**
* **Juan Rechach**
* **Xavier Coll Bagur** 
* **Ignasi Coll Bagur**
