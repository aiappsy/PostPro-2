#!/bin/bash
set -e

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Use the PORT environment variable if available, default to 3000
PORT=${PORT:-3000}

echo "Starting application on port $PORT"

# Adjust Apache port for Cloud Run
if [ -n "$PORT" ]; then
    sed -i "s/Listen 80/Listen $PORT/g" /etc/apache2/ports.conf
    sed -i "s/<VirtualHost \*:80>/<VirtualHost \*:$PORT>/g" /etc/apache2/sites-available/000-default.conf
fi

# Start Apache
apache2-foreground
