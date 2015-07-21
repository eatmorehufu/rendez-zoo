RendezZoo.Collections.Categories = Backbone.Collection.extend({
  url: "/api/categories",
  model: RendezZoo.Models.Category
})

_.extend(RendezZoo.Collections.Categories.prototype, RendezZoo.Mixins.createGetOrFetch);
