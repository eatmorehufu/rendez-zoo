RendezZoo.Models.Event = Backbone.Model.extend({
  urlRoot: "/api/events",

  parse: function(response) {
    response.attendees && this.attendees().set(response.attendees);
    // response.location && this.location().set(response.location);
    delete response.attendees;

    return response;
  },

  attendees: function(){
    if (!this._attendees) {
      this._attendees = new RendezZoo.Collections.Users({ rsvpEvent: this });
    };

    return this._attendees;
  }
})


// _.extend(RendezZoo.Models.Event.prototype, RendezZoo.Mixins.Locatable);
