window.RendezZoo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  initialize: function() {
    RendezZoo.jsKey = "js-i0AUsVOFc4vCmlD3z4C1A43H2CIRqrmJsWEUSsz4x5GTqjWZoz0YE4GGGpy7QVRi";
    RendezZoo.groups = new RendezZoo.Collections.Groups();
    RendezZoo.users = new RendezZoo.Collections.Users();
    RendezZoo.currentUser = new RendezZoo.Models.CurrentUser();
    new RendezZoo.Routers.Router({$rootEl: $("#content")});
    Backbone.history.start();
  }
};
