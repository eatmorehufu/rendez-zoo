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
    ":slug/events/new": "newEvent",
    ":slug/edit": "editGroup",
    ":slug/events/:event_id/edit" : "editEvent",
    ":slug/events/:event_id": "eventDetail",
    ":slug/members/:member_id": "groupMemberShow",
    ":slug/members": "groupMemberIndex",
    ":slug/photos": "groupPhotoIndex",
    ":slug": "groupShow"
  },

  groupsIndex: function() {
    RendezZoo.groups.fetch();
    var groupIndexView = new RendezZoo.Views.GroupsIndex({
      collection: RendezZoo.groups
    });

    this._swapViews(groupIndexView);
  },

  userProfile: function() {
    if (!this._requireSignedIn(this.userProfile.bind(this))) { return; };
    var user = RendezZoo.users.getOrFetch(RendezZoo.currentUser.id);
    var userProfileView = new RendezZoo.Views.UserShow({model: user});

    this._swapViews(userProfileView);
  },

  newGroup: function (){
    if (!this._requireSignedIn(this.newGroup.bind(this))) { return; };
    var newGroup = new RendezZoo.Models.Group();
    var newGroupView = new RendezZoo.Views.NewGroup({ model: newGroup });

    this._swapViews(newGroupView);
  },

  groupShow: function (slug){
    window.scrollTo(0, 0);
    var group = RendezZoo.groups.getOrFetchBySlug(slug);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group
    });

    this._swapViews(groupShowView);
  },

  editGroup: function(slug){
    if (!this._requireSignedIn(this.editGroup.bind(this, slug))) { return; };
    if (!RendezZoo.currentUser.organizerGroups().findWhere({slug: slug})) { return; };
    var editGroup = RendezZoo.groups.getOrFetchBySlug(slug);
    var newGroupView = new RendezZoo.Views.GroupShow({
      model: editGroup,
      subPage: "editGroup"
    });

    this._swapViews(newGroupView);
  },

  newEvent: function (slug) {
    if (!this._requireSignedIn(this.newEvent.bind(this, slug))) { return; };

    var group = RendezZoo.groups.getOrFetchBySlug(slug);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "newEvent"
    });

    this._swapViews(groupShowView);
  },

  editEvent: function(slug, event_id) {
    if (!this._requireSignedIn(this.editEvent.bind(this, slug, event_id))) { return; };
    if (!RendezZoo.currentUser.organizerGroups().findWhere({slug: slug})) { return; };
    var group = RendezZoo.groups.getOrFetchBySlug(slug);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "editEvent",
      subId: event_id
    });

    this._swapViews(groupShowView);
  },

  eventDetail: function(slug, event_id) {
    window.scrollTo(0, 0);
    var group = RendezZoo.groups.getOrFetchBySlug(slug);
    var groupShowView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "eventDetail",
      subId: event_id
    });

    this._swapViews(groupShowView);
  },

  groupMemberIndex: function(slug) {
    var group = RendezZoo.groups.getOrFetchBySlug(slug);
    var memberIndexView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "memberIndex"
    })

    this._swapViews(memberIndexView);
  },

  groupMemberShow: function(slug, member_id) {
    var group = RendezZoo.groups.getOrFetchBySlug(slug);
    var memberDetailView = new RendezZoo.Views.GroupShow({
      model: group,
      subPage: "memberDetail",
      subId: member_id
    })

    this._swapViews(memberDetailView);
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
