RendezZoo.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: RendezZoo.Models.User,
  initialize: function(options) {
  },

  getOrFetch: function(id) {
    var user = this.get(id);
    if (user){
      user.fetch();
    } else {
      user = new RendezZoo.Models.User({ id: id });
      user.fetch({
        success: function(){
          this.remove(user);
          this.add(user, { merge: true });
        }.bind(this)
      });
    };

    return user;
  }
})
