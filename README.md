# Rendez-Zoo

[Heroku link][heroku]

[heroku]: http://rendez-zoo.herokuapp.com

## Welcome!

Rendez-Zoo is a near-faithful clone of Meetup.com (for non-human animals) that I
created for my capstone project to demonstrate fluency and proficiency in the
various programming languages, frameworks, and libraries used.

I chose a single-page design over the actual multi-page layout of the source
material to better leverage my infrastructural limitations. With JSON's
lightweight footprint, all server and database requests take place quickly and
asynchronously in order to provide the most responsive user experience possible.

## Well what did you use?

I'm glad you asked!

### Languages:
- Javascript
- Ruby
- HTML / CSS

### Frameworks:
- Backbone
- Rails

### Libraries and Technologies:
- jQuery / AJAX
- jQuery-UI
- paperclip / AWS
- Geocoder
- pg_search
- kaminari
- figaro
- jbuilder
- omniauth

## What can I do on this website?

You can:
- Securely create an account
- Create a group
- Create events if you're an owner or organizer
- Visibly RSVP for events
- Edit your own profile, your owned groups' profiles, and event details
- Search for local groups that match your interests
- Have a great time enjoying animal puns.

## What kind of problems did you have to solve?

You didn't actually ask this question, but I will answer it anyway.

- Search nearby locations for groups
  - Search involves SQL queries with the Haversine formula
  - Geocoder gem handles Google geocoding API and nearby search
- API responses that yield nested data
  - Groups, members, and events have nested associations that require complex
    JSON builders and Backbone models to handle
  - Structuring responses to prevent N+1 database queries
- Nested composite views
  - Group show pages contain multi-tiered nested views that all require different
    data from the server
  - Group show view functions as a sub-router to display multiple templates


## Future polishing touches
- Infinite scroll
- Messaging and friending
- Notifications
- Comments on groups
- Hover-over background queries for member profiles and group interests
- Nearby events search
- User HuD that reminds user of upcoming events and member groups
