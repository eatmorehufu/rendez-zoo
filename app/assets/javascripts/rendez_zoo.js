window.RendezZoo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    RendezZoo.groups = new RendezZoo.Collections.Groups()
    RendezZoo.users = new RendezZoo.Collections.Users();
    RendezZoo.currentUser = new RendezZoo.Models.CurrentUser();
    new RendezZoo.Routers.Router({$rootEl: $("#content")});
    Backbone.history.start();
  }
};
