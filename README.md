<h1 align="center">Good Weather</h1>

<div align="center">

[![CircleCI](https://circleci.com/gh/enitschorn/good-weather.svg?style=svg)](https://circleci.com/gh/enitschorn/good-weather)

</div>

It's always good weather for somethign

# TL;DR

```
asdf install
npm install -g https://yarnpkg.com/downloads/1.22.5/yarn-v1.22.5.tar.gz

bundle exec rails db:create && db:migrate

make build

rails server
open http://localhost:3000

bin/webpack-dev-server

# create a user m@m.m
open http://localhost:3000/admin
# confirm email

# make an adminstrator
rails 'user:make_admin[m@m.m]'

# input some locations
open http://localhost:3000/admin/locations

# view them
http://localhost:3000/search

# geocode them
rails location:enrich_lat_lng

# set some locations to have is `fetching forecast` TRUE
# fetch forecast
rails forecast:locations

# view them coming next ...
http://localhost:3000/forecasts
```

* get a copy of the DB from production

```
heroku pg:backups:capture
heroku pg:backups:download

pg_restore \
  --verbose \
  --clean \
  --no-acl \
  --no-owner \
  -h localhost \
  -d good_weather_development \
  latest.dump

rm latest.dump
```

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
