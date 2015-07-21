RendezZoo.Collections.Groups = Backbone.Collection.extend({
  url: "/api/groups",
  model: RendezZoo.Models.Group
})

_.extend(RendezZoo.Collections.Groups.prototype, RendezZoo.Mixins.createGetOrFetch);
