window.RendezZoo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    RendezZoo.groups = new RendezZoo.Collections.Groups()
    new RendezZoo.Routers.Router({$rootEl: $("#content")});
    Backbone.history.start();
  }
};
