# Phase 2: Connecting Groups, Events, and Members

## Rails
### Models

### Controllers
Api::GroupsController (index, show)
Api::EventsController (index, show)
Api::UsersController (show)

### Views

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
* BlogForm
* BlogShow (composite view, contains PostsIndex subview)
* PostsIndex (composite view, contains PostsIndexItem subviews)
* PostsIndexItem
* PostShow

## Gems/Libraries
