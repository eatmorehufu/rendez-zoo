RendezZoo.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['users/sign_in'],

  events: {
    "submit form.new-session": "signIn"
  },

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(RendezZoo.currentUser, "signIn sync", this.signInCallBack);
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  },

  signIn: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON().user;
    RendezZoo.currentUser.signIn({
      email: attrs.email,
      password: attrs.password,
      success: function(){
      },
      error: function() {
        alert("Wrong username/password combination. Please try again.");
      }
    })
  },

  signInCallBack: function(event) {
    console.log("entering signInCallBack");
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }
})
