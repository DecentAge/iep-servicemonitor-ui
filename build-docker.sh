#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

RELEASE_VERSION=$(cat release-version.txt)
docker build -t decentage/iep-servicemonitor-ui:${RELEASE_VERSION} .

echo "Creating fake zip file to avoid artifact upload issue"
mkdir -p ./build
touch ./build/iep-servicemonitor-ui.zip