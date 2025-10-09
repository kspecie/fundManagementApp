#!/bin/sh
# wait-for-db.sh: wait until Postgres is ready before starting the API

set -e

host="$DB_HOST"
port="$DB_PORT"

echo "Waiting for Postgres at $host:$port..."

until PGPASSWORD=$DB_PASSWORD psql -h "$host" -U "$DB_USER" -d "$DB_DATABASE" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres is unavailable - sleeping 1 second..."
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"
