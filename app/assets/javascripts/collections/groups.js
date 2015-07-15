RendezZoo.Collections.Groups = Backbone.Collection.extend({
  url: "/api/groups",
  model: RendezZoo.Models.Group,

  getOrFetch: function(id) {
    var group = RendezZoo.groups.get(id);
    if (group){
      group.fetch();
    } else {
      group = new RendezZoo.Models.Group({ id: id});
      group.fetch({
        success: function(){
          RendezZoo.groups.add(group, { merge: true });
        }.bind(this)
      })
    }

    return group;
  }
})
