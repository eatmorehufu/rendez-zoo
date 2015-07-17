RendezZoo.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],

  events: {
    "click .log-out": "logOut"
  },

  initialize: function(options){
    this.$el.addClass("nav-bar group");
    this.listenTo(RendezZoo.currentUser, 'signIn signOut sync destroy', this.render)
  },

  render: function() {
    this.loggedIn = !(RendezZoo.currentUser.isNew());
    var content = this.template({loggedIn: this.loggedIn});
    this.$el.html(content);
    return this;
  },

  logOut: function() {
    RendezZoo.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("", { trigger: true })
      }
    });
  }
})
