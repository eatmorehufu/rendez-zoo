RendezZoo.Collections.Events = Backbone.Collection.extend({
  url: "api/events",
  model: RendezZoo.Models.Event,

  pastEvents: function(){
    
  },

  upcomingEvents: function() {

  }

})

_.extend(RendezZoo.Collections.Events.prototype, RendezZoo.Mixins.createGetOrFetch);
