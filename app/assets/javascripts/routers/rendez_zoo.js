RendezZoo.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
    this._currentUser = new RendezZoo.Models.CurrentUser();
    this._currentUser.fetch();
    this._headerView = new RendezZoo.Views.Header({
      currentUser: this._currentUser
    })
    this.$rootEl.find(".navigation-header").html(this._headerView.render().$el);
  },

  routes: {
    "": "groupsIndex"
  },
})
