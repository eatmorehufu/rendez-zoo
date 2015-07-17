RendezZoo.Collections.Groups = Backbone.Collection.extend({
  url: "/api/groups",
  model: RendezZoo.Models.Group,

  getOrFetch: function(id) {
    console.log(id)
    var group = RendezZoo.groups.get(id);
    if (group){
      group.fetch();
    } else {
      group = new RendezZoo.Models.Group({ id: id });
      console.log(group)
      group.fetch({
        success: function(){
          RendezZoo.groups.add(group, { merge: true });
        }
      });
    }

    return group;
  }
})
