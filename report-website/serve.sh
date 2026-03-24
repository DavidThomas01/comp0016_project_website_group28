#!/usr/bin/env bash
# Serves the static report site. Uses port 5500 by default so it does not clash
# with other tools that often bind 8080 (e.g. FastAPI/uvicorn), which return
# JSON {"detail":"Not Found"} for /index.html instead of this HTML site.
set -e
cd "$(dirname "$0")"
PORT="${1:-5500}"
exec npx --yes live-server --port="$PORT" --open=/index.html
