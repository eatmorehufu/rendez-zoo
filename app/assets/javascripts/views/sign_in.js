RendezZoo.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['users/sign_in'],
  tagName: "section",

  events: {
    "submit form.new-session": "signIn",
    "click #demo-login": "demoLogin"
  },

  initialize: function(options){
    this.$el.addClass("new-user group")
    this.callback = options.callback;
    this.listenTo(RendezZoo.currentUser, "signIn", this.signInCallBack);
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
      error: function() {
        alert("Wrong username/password combination. Please try again.");
      }
    })
  },

  signInCallBack: function(event) {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  demoLogin: function(event){
    event.preventDefault();
    RendezZoo.currentUser.signIn({
      email: "sennacy@cat.com",
      password: "password"
    })
  }
})
