RendezZoo.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],
  initialize: function(options){
    this._currentUser = options.currentUser;
    this.$el.addClass("nav-bar group");
    this.listenTo(this._currentUser, 'sync', this.render)
  },

  render: function() {
    this.loggedIn = !!(this._currentUser && this._currentUser.id);
    var content = this.template({loggedIn: this.loggedIn});
    this.$el.html(content);
    return this;
  }
})
