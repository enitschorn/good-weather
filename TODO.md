# TODO

- **CS** rails webpack:install:typescipt ???
- [ ] data some POI
  - **MM 1.5** we should add some more data we are actually interest in
  - [x] user/admin can add an image - AWS S3 bucket & Upload Rails thing &
    how does this work in adminstrate?
  - [ ] secure S3 bucket
  - [ ] resize images
  - [ ] image dispaly carousel
  - [X] add administrate ability to use google places
    - [X] and all the things it returns, lat, long, type etc
    - [ ] our quota
      https://developers.google.com/places/web-service/usage-and-billing#places-details
      1.7 cents per each = $17 per 1,000
      but you get $200 credits each month?
      watch this space
    - [X] and display on page
  - styling of a POI
  - styling list of POI's ie dispaly 3 and > < to move left and right etc
  - **CS/MM** styling of the map - weather over time, display POI
  - filter for date, activity, general location
  - activities to be many to many with POI's
  - Alerts
  - Alrts and POI's should have associated days of week for example things that are not open on sunday etc
- [ ] weather data job
- [ ] annoyances
  - [ ] sign in should take you to homepage? only to admin if you can admin
- [ ] landing page
  - https://medium.com/@LoganTjm/9-tactics-of-pre-launch-app-landing-pages-that-get-thousands-of-signups-477905a0ed22
    - market 2-3 months before launch to get a pre-launch database
    - include
      - screenshots/visuals
      - description
      - lint to more info
      - call to action to get email
      - network growth
      - social links
    - front page should make it obvious to what you are signing up to
    - emotional and problem focused copy
      - emotion
      - urgency
      - makes a promise
      - drives action
    - obvious call to action NOT "sign up"
    - just email, maybe location?
    - incentive - exclusive, early access, free trial, complimentary
    - be creative with the sign up success email
    - social shares after signup
  - https://www.hongkiat.com/blog/mobile-app-landing-pages/
    - example images
  - https://geekflare.com/create-prelaunch-landing-page/
    - 3rd parties to build landing page
    - like https://landerapp.com/landing-page-templates/coming-soon
  - more inspiration
    - https://gleam.io/blog/launch-page/
    - https://www.shopify.com.au/blog/coming-soon-page
    - https://startupfashion.com/5-great-pre-launch-landing-pages-to-inspire-you/
    - https://designli.co/blog/how-to-build-the-perfect-pre-launch-landing-page/
  - RAILS SPECIFIC
    - https://www.plymouthsoftware.com/articles/ruby-on-rails-5-checks-before-launching-your-app
      - [ ] customise 404 and 500 pages
      - [ ] enfoce ssl
      - [x] use UUID
    - https://github.com/codelitt/launchpage-rails
      - sample app

- [ ] A/B test landing pages
- [ ] google analytics
- [ ] location directory for SEO
- [ ] js prettier
- [ ] upgrade to Ruby 3.0.0

## Done

- [x] basic tests running
  - [x] on circle ci
  - [x] rubocop
  - [x] lint
  - [x] capybara
- [x] user model and devise
- [x] admin priveleges
- [x] administrate or similar for backend pages
- [x] react
- [x] map
- [x] email and email framework
- [x] bootstrap
- [x] setup pg crypto use UUID
- [x] update Rails 6.1.1 and ruby 2.7.1

