#!/bin/sh

# Wait for the database to be ready
/wait-for-it.sh db:5432 -t 60

# Start your application
yarn start
