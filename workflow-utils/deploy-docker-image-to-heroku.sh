#!/bin/sh

set -e 

IMAGE_NAME=$1
HEROKU_APP_NAME=$2

# Build image names
GITHUB_DOCKER_IMAGE_NAME="docker.pkg.github.com/els-illencs/hackovid/$IMAGE_NAME:$GITHUB_RUN_NUMBER"

HEROKU_DOCKER_IMAGE_NAME="registry.heroku.com/$HEROKU_APP_NAME/web"

# Pull image from Gitlab registry
docker login -u $GITHUB_ACTOR -p $GITHUB_TOKEN docker.pkg.github.com
docker pull $GITHUB_DOCKER_IMAGE_NAME

# Push image to Heroku registry
docker tag $GITHUB_DOCKER_IMAGE_NAME $HEROKU_DOCKER_IMAGE_NAME
docker login -u _ -p $HEROKU_API_KEY registry.heroku.com
docker push $HEROKU_DOCKER_IMAGE_NAME

# Notify Heroku to publish the pushed image
DOCKER_IMAGE_ID=$(docker inspect $HEROKU_DOCKER_IMAGE_NAME --format={{.Id}})

curl -n -X PATCH https://api.heroku.com/apps/$HEROKU_APP_NAME/formation \
    -d "{ 
        \"updates\": [
            {
                \"type\": \"web\",
                \"docker_image\": \"$DOCKER_IMAGE_ID\"
            }
        ]
    }" \
    -H "Content-Type: application/json" \
    -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
    -H "Authorization: Bearer $HEROKU_API_KEY"