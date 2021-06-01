#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

RELEASE_VERSION=$(cat release-version.txt)
docker build -t decentage/iep-servicemonitor-ui:${RELEASE_VERSION} .


CONTAINER_ID=$(docker create --rm --name iep-servicemonitor-ui-extract decentage/iep-servicemonitor-ui:${RELEASE_VERSION})
mkdir -p ./build
docker cp ${CONTAINER_ID}:/build/iiep-servicemonitor-ui.zip ./build
docker rm ${CONTAINER_ID}
