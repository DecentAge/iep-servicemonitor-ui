#!/bin/sh
set -eu

echo "Setting environment variables /usr/share/nginx/html/env.config.js using template /etc/nginx/templates/env.config.js.template"
envsubst < /etc/nginx/templates/env.config.js.template > /usr/share/nginx/html/env.config.js

echo "generated the following environment config:"
cat usr/share/nginx/html/env.config.js