RendezZoo.Views.UsersForm = Backbone.CompositeView.extend({
  template: JST['users/form'],
  tagName: "section",
  events: {
    "submit form" : "submit"
  },

  initialize: function(options){
    this.$el.addClass("new-user group");
    this.callback = options.callback;
    this.listenTo(RendezZoo.currentUser, "signIn", this.signInCallBack);
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    RendezZoo.currentUser.signUp(attrs);
  },

  signInCallBack: function(event) {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }
})
