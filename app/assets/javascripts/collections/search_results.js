RendezZoo.Collections.SearchResults = Backbone.Collection.extend({
  url: "/api/search",

  parse: function(resp) {
    return resp.results;
  },

  model: function (attrs) {
    var type = attrs._type;
    delete attrs._type;
    return new RendezZoo.Models[type](attrs);
  }
})
