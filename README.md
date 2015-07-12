# Rendez-Zoo

[Heroku link][heroku]

[heroku]: http://rendez-zoo.herokuapp.com

## Minimum Viable Product
Rendez-zoo is a clone of MeetUp built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create meet-up groups
- [ ] Create group events
- [ ] Join meet-up groups
- [ ] RSVP for events
- [ ] Search for groups and events
- [ ] Create group galleries of photos
- [ ] View members on group page
- [ ] Tag group by category
- [ ] View related groups by shared membership
- [ ] Edit groups / events / user details


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Group Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create groups using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Viewing Groups and Events (~2 days)
I will add API routes to serve user, group and event data as JSON, then add
Backbone models and collections that fetch data from those routes. By the end of
this phase, users will be able to create and view groups and events, all
inside a joint rails / Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Group/Events (~2 days)
I plan to use third-party libraries to add functionality to the `GroupForm`, 'EventForm' and
`EventShow` views in this phase. First I'll need to add a Markdown editor to both forms, and make sure that the Markdown is properly escaped and formatted in
the show views. I also plan to integrate Filepicker for file upload so
users can add images to blog posts.

[Details][phase-three]

### Phase 4: User RSVPs (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`subscribed_blogs` association to serve a list of blog posts ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `posts`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-four]

### Phase 5: Searching for Groups and Events (~2 days)
I'll need to add `search` routes to both the Groups and Events controllers.
On the Backbone side, there will be a `SearchResults` composite view has
`BlogsIndex` and `PostsIndex` subviews. These views will use plain old `blogs` and
`posts` collections, but they will fetch from the new `search` routes.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] View calendar of events on group page
- [ ] User avatars
- [ ] Event comment system
- [ ] Pagination/infinite scroll
- [ ] Typeahead search bar
- [ ] Multiple sessions/session management
- [ ] Internal messaging system
- [ ] Internal friend system
- [ ] Notification system
- [ ] Photo Album System
- [ ] Twitter/Facebook/Google integration

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
