RendezZoo.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
    this._currentUser = new RendezZoo.Models.CurrentUser();
    this._currentUser.fetch();
    var headerView = new RendezZoo.Views.Header({currentUser: this._currentUser})
  },

  routes: {
    "": "groupsIndex"
  },
})
