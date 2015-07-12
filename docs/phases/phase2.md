# Phase 2: Connecting Groups, Events, and Members

## Rails
### Models
* GroupMembership
* EventAttendance

### Controllers
Api::GroupsController (index, show)
Api::EventsController (index, show)
Api::UsersController (show)

### Views
api/groups/index.json.jbuilder
api/groups/show.json.jbuilder
api/events/index.json.jbuilder
api/events/show.json.jbuilder
api/users/show.json.jbuilder

## Backbone
### Models
* Group (parses nested `events` and `members` associations)
* Event (parses nested `attendees` association)
* Member (parses nested `groups` association)

### Collections
* Groups
* Events
* Members

### Views
* Members (hover view)
* UpcomingEvents (composite view, contains `Members` subview and `EventShow` subview)
* PastEvents (composite view, contains `Members` subview and `EventShow` subview)
* EventShow


## Gems/Libraries
