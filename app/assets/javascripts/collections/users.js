RendezZoo.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: RendezZoo.Models.User,
  initialize: function(options) {
    this.rsvpEvent = options.rsvpEvent;
  }
})
