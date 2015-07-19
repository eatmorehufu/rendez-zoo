RendezZoo.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;

    RendezZoo.currentUser.fetch();
    this._headerView = new RendezZoo.Views.Header();
    this.$rootEl.find(".navigation-header").html(this._headerView.render().$el);
    $('#page-body').on("click", this.closeMenu);
  },

  routes: {
    "": "groupsIndex",
    "profile": "userProfile",
    "users/new": "newUser",
    "session/new": "signIn",
    "groups/new": "newGroup",
    "groups/:id/events/new": "newEvent",
    "groups/:id/edit": "editGroup",
    "groups/:group_id/events/:event_id/edit" : "editEvent",
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

  userProfile: function() {
    if (!this._requireSignedIn(this.newGroup.bind(this))) { return; };
    var userProfileView = new RendezZoo.Views.UserShow({model: RendezZoo.currentUser});

    this._swapViews(userProfileView);
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

  editGroup: function(id){
    console.log(RendezZoo.currentUser.organizerGroups());
    if (!this._requireSignedIn(this.editGroup.bind(this, id))) { return; };
    if (!RendezZoo.currentUser.organizerGroups().get(id)) { return; };
    var editGroup = RendezZoo.groups.getOrFetch(id);
    var newGroupView = new RendezZoo.Views.GroupShow({
      model: editGroup,
      subPage: "editGroup"
    });

    this._swapViews(newGroupView);
  },

  newEvent: function (id) {
    if (!this._requireSignedIn(this.newEvent.bind(this, id))) { return; };

    var group = RendezZoo.groups.getOrFetch(id);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "newEvent"
    });

    this._swapViews(groupShowView);
  },

  editEvent: function(group_id, event_id) {
    if (!this._requireSignedIn(this.editEvent.bind(this, group_id, event_id))) { return; };
    if (!RendezZoo.currentUser.organizerGroups().get(group_id)) { return; };
    var group = RendezZoo.groups.getOrFetch(group_id);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "editEvent",
      subId: event_id
    });

    this._swapViews(groupShowView);
  },

  eventDetail: function(group_id, event_id) {
    var group = RendezZoo.groups.getOrFetch(group_id);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
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
  },

  closeMenu: function(event) {
    $(document).find('.profile-menu-items').removeClass('open');
  }
})
