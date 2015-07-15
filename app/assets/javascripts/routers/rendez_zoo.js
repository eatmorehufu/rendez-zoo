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
    "": "groupsIndex",
    "groups/new": "newGroup",
    "groups/:id": "groupShow"
  },

  groupsIndex: function() {
    RendezZoo.groups.fetch();
    var groupIndexView = new RendezZoo.Views.GroupsIndex({collection: RendezZoo.groups})

    this._swapComposites(groupIndexView);
  },

  newGroup: function (){

  },

  groupShow: function (id){
    


  },


  _swapComposites: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.find("#page-body").html(view.render().$el);
  }
})
