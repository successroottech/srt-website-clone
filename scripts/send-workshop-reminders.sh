#!/bin/sh
set -e

cd /var/www/html/projects/srt-website-clone
set -a
. ./.env

curl --fail --silent --show-error \
  --header "Authorization: Bearer ${CRON_SECRET}" \
  http://127.0.0.1:3015/api/workshop-reminders/
