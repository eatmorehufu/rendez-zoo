RendezZoo.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: RendezZoo.Models.User,
  initialize(options) {
    this.rsvpEvent = options.rsvpEvent;
  }
})
