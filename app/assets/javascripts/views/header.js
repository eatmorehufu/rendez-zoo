RendezZoo.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],
  loggedInTemplate: JST['_logged_in_buttons'],
  loggedOutTemplate: JST['_logged_out_buttons'],

  events: {
    "click .log-out": "logOut",
    "click .profile-menu > h3" : "openMenu"
  },

  initialize: function(options){
    this.$el.addClass("nav-bar group");
    this.listenTo(RendezZoo.currentUser, 'signIn signOut sync destroy', this.render);
  },

  render: function() {
    var content = this.template({
      loggedIn: this.loggedIn
    });

    var buttons = RendezZoo.currentUser.isSignedIn() ? this.loggedInTemplate({currentUser: RendezZoo.currentUser}) : this.loggedOutTemplate();
    this.$el.html(content);
    this.$el.append(buttons);
    return this;
  },

  logOut: function() {
    RendezZoo.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("", { trigger: true })
      }
    });
  },

  openMenu: function(event) {
    this.$('.profile-menu-items').addClass('open');
  },
})
