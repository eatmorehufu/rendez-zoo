RendezZoo.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;

    RendezZoo.currentUser.fetch();
    this._headerView = new RendezZoo.Views.Header();
    this.$rootEl.find(".navigation-header").html(this._headerView.render().$el);
  },

  routes: {
    "": "groupsIndex",
    "users/new": "newUser",
    "session/new": "signIn",
    "groups/new": "newGroup",
    "groups/:id/events/new": "newEvent",
    "groups/:group_id/events/:event_id": "eventDetail",
    "groups/:id/members": "groupMemberIndex",
    "groups/:id/photos": "groupPhotoIndex",
    "groups/:id": "groupShow"
  },

  groupsIndex: function() {
    RendezZoo.groups.fetch();
    var groupIndexView = new RendezZoo.Views.GroupsIndex({
      collection: RendezZoo.groups
    });

    this._swapViews(groupIndexView);
  },

  newGroup: function (){
    if (!this._requireSignedIn(this.newGroup.bind(this))) { return; };
    var newGroup = new RendezZoo.Models.Group();
    var newGroupView = new RendezZoo.Views.NewGroup({ model: newGroup });

    this._swapViews(newGroupView);
  },

  groupShow: function (id){
    var group = RendezZoo.groups.getOrFetch(id);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      currentUser: this._currentUser
    });

    this._swapViews(groupShowView);
  },

  newEvent: function (id) {
    if (!this._requireSignedIn(this.newGroup.bind(this))) { return; };

    var group = RendezZoo.groups.getOrFetch(id);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      currentUser: this._currentUser,
      subPage: "newEvent"
    });

    this._swapViews(groupShowView);
  },

  eventDetail: function(group_id, event_id) {
    var group = RendezZoo.groups.getOrFetch(group_id);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      currentUser: this._currentUser,
      subPage: "eventDetail",
      subId: event_id
    });

    this._swapViews(groupShowView);
  },

  groupMemberIndex: function(id) {

  },

  groupPhotoIndex: function(id) {

  },

  newUser: function () {
    if (!this._requireSignedOut()) { return; };
    var formView = new RendezZoo.Views.UsersForm({});

    this._swapViews(formView);
  },

  signIn: function(callback) {
    if (!this._requireSignedOut(callback)) { return; };
    var signInView = new RendezZoo.Views.SignIn({
      callback: callback
    });

    this._swapViews(signInView);
  },

  _requireSignedIn: function(callback){
  if (!RendezZoo.currentUser.isSignedIn()) {
    callback = callback || this._goHome.bind(this);
    this.signIn(callback);
    return false;
  };

    return true;
  },

  _requireSignedOut: function(callback){
    if (RendezZoo.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    };

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _swapViews: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.find("#page-body").html(view.render().$el);
  }
})
