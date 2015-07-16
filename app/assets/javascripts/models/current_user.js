RendezZoo.Models.CurrentUser = Backbone.Model.extend({
  url: "/api/current_user",

  parse: function(response) {
    response.memberGroups && this.memberGroups().set(response.memberGroups);
    response.organizerGroups && this.organizerGroups().set(response.organizerGroups);
    response.rsvpEvents && this.rsvpEvents().set(response.rsvpEvents);

    delete response.memberGroups;
    delete response.rsvpEvents;
    delete response.organizerGroups;

    return response;
  },

  memberGroups: function(){
    if (!this._memberGroups){
      this._memberGroups = new RendezZoo.Collections.Groups({ member: this });
    }

    return this._memberGroups;
  },

  organizerGroups: function(){
    if (!this._organizerGroups) {
      this._organizerGroups = new RendezZoo.Collections.Groups({ organizer: this })
    }

    return this._organizerGroups
  },

  rsvpEvents: function() {
    if (!this._rsvpEvents) {
      this._rsvpEvents = new RendezZoo.Collections.Events({ member: this })
    }

    return this._rsvpEvents
  }
})
