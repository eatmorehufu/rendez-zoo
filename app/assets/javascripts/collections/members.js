RendezZoo.Collections.Members = Backbone.Collection.extend({
  url: "/api/members",
  model: RendezZoo.Models.Member,
  initialize(options) {
    this.rsvpEvent = options.rsvpEvent;
  }
})
