RendezZoo.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],
  initialize: function(options){
    this.loggedIn = (options.currentUser && typeof options.currentUser.id !== "undefined");
    this.$el.addClass("nav-bar group")
    this.listenTo(this.currentUser, 'sync', this.render)
  },

  render: function() {
    var content = this.template({loggedIn: this.loggedIn})
    this.$el.html(content)
    return this
  }
})
