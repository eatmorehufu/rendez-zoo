# Rendez-Zoo

[Heroku link][heroku]

[heroku]: http://rendez-zoo.herokuapp.com

## Minimum Viable Product
Rendez-zoo is a clone of MeetUp built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create meet-up groups
- [x] Create group events
- [x] Join meet-up groups
- [x] RSVP for events
- [ ] Search for groups and events
- [ ] Create group galleries of photos
- [ ] View members on group page
- [ ] Tag group by category
- [ ] View related groups by shared membership
- [X] Edit groups / events / user details


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

### Phase 2: Connecting Groups, Events, and Members (~2 days)
I will add API routes to serve user, group and event data as JSON, then add
Backbone models and collections that fetch data from those routes. By the end of
this phase, users will be able to create, view and join groups and events, all
inside a joint rails / Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Group/Events (~2 days)
I plan to use third-party libraries to add functionality to the `GroupForm`,
`EventForm` and `EventShow` views in this phase. First I'll need to add a
Markdown editor to both forms, and make sure that the Markdown is properly
escaped and formatted in the show views. I also plan to integrate Filepicker
for file upload so users can add images to blog posts. I'll also add photos and
a `groups` route that uses the `current_user`'s `group_memberships` association
to serve a list of groups ordered chronologically.

[Details][phase-three]

### Phase 4: Categories (~1-2 days)
I'll start by creating the `Category` model and the join-model of `UserInterest`
and `GroupCategory`. I'll add controller actions on Users and Groups to
facilitate their creation on the rails side.

[Details][phase-four]

### Phase 5: Searching for Groups and Events, Editing and Member pages (~2 days)
I'll need to add `search` routes to both the Groups and Events controllers.
These will be done via query string on the rails side. I'll also implement edit
and update functionality for groups, events, and members, and fully implement
the member show page.

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



Stack:
Fix mouseover bug(????)
O-Auth
Change RSVP text when RSVPING
generate robust feedback when form inputs are incorrect
