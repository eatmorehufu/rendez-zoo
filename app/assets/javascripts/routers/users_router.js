RendezZoo.Routers.Users = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this._currentUser = new RendezZoo.Models.CurrentUser();
    this._currentUser.fetch();
    this._headerView = new RendezZoo.Views.Header({
      currentUser: this._currentUser
    })
    this.$rootEl.find(".navigation-header").html(this._headerView.render().$el);
  },

  routes: {
    "users/new": "new",
    "session/new": "signIn"
  },

  new: function () {
    if (!this._requireSignedOut()) { return; }

    var newUser = RendezZoo.Models.User();
    var formView = new RendezZoo.Views.UsersForm({
      model: newUser
    })

    this._swapView(formView)
  },

  signIn: function(callback) {
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new RendezZoo.Views.SignIn({
      callback: callback
    });

    this._swapView(signInView)
  }


})
