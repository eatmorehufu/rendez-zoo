window.RendezZoo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new RendezZoo.Routers.Router({$rootEl: $("#content")});
    Backbone.history.start();
  }
};
