RendezZoo.Models.Event = Backbone.Model.extend({
  urlRoot: "/api/events",

  parse: function(response) {
    response.attendees && this.attendees().set(response.attendees);
    delete response.attendees;

    return response;
  },

  attendees: function(){
    if (!this._attendees) {
      this._attendees = RendezZoo.Collections.Members({ rsvpEvent: this });
    }

    return this._attendees;
  }
})
