RendezZoo.Collections.Events = Backbone.Collection.extend({
  url: "api/events",
  model: RendezZoo.Models.Event

})

_.extend(RendezZoo.Collections.Events.prototype, RendezZoo.Mixins.createGetOrFetch);
