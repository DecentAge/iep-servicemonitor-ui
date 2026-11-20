#!/bin/sh
set -eu

echo "Setting environment variables /usr/share/nginx/html/env.config.js using template /etc/nginx/templates/env.config.js.template"
envsubst < /etc/nginx/templates/env.config.js.template > /usr/share/nginx/html/env.config.js

echo "generated the following environment config:"
cat /usr/share/nginx/html/env.config.js

INDEX=/usr/share/nginx/html/index.html
STATISTIKWERK_SCRIPT_SRC="${STATISTIKWERK_SCRIPT_SRC:-/iep-static-site/statistikwerk/s.js}"
sed -i '/data-api="https:\/\/statistikwerk.ch\/e.php"/d' "$INDEX"
case "${STATISTIKWERK_SITE_ID:-}" in
  "") echo "Statistikwerk disabled (STATISTIKWERK_SITE_ID empty)" ;;
  *[!A-Za-z0-9]*) echo "Invalid STATISTIKWERK_SITE_ID, Statistikwerk disabled" >&2 ;;
  *)
    case "$STATISTIKWERK_SCRIPT_SRC" in
      /*[!A-Za-z0-9/._-]*|[!/]*) echo "Invalid STATISTIKWERK_SCRIPT_SRC, Statistikwerk disabled" >&2 ;;
      *)
        sed -i "s#</head>#  <script defer data-site=\"${STATISTIKWERK_SITE_ID}\" data-api=\"https://statistikwerk.ch/e.php\" src=\"${STATISTIKWERK_SCRIPT_SRC}\"></script>\n</head>#" "$INDEX"
        echo "Statistikwerk enabled (site ${STATISTIKWERK_SITE_ID})"
        ;;
    esac
    ;;
esac
