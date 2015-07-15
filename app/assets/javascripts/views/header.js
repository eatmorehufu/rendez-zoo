RendezZoo.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],
  tagName: "section",
  initialize: function(options){
    this.currentUser = options.currentUser;
    this.$el.addClass("navigation-header")
  },

  render: function() {
    var content = this.template({currentUser: this.currentUser})
    this.$el.html(content)
    return this
  }
})
