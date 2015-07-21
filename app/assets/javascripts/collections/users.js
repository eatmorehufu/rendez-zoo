RendezZoo.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: RendezZoo.Models.User,
  initialize: function(options) {
  }
})

_.extend(RendezZoo.Collections.Users.prototype, RendezZoo.Mixins.createGetOrFetch);
