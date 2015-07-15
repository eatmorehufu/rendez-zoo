RendezZoo.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],

  events: {
    "click .log-out": "logOut"
  },

  initialize: function(options){
    this._currentUser = options.currentUser;
    this.$el.addClass("nav-bar group");
    this.listenTo(this._currentUser, 'sync destroy', this.render)
  },

  render: function() {
    this.loggedIn = !!(this._currentUser && this._currentUser.id);
    var content = this.template({loggedIn: this.loggedIn});
    this.$el.html(content);
    return this;
  },

  logOut: function() {
    this._currentUser.destroy();
    this._currentUser.fetch();
  }
})
