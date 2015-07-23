RendezZoo.Collections.Groups = Backbone.Collection.extend({
  url: "/api/groups",
  model: RendezZoo.Models.Group,

  getOrFetchBySlug: function(slug) {
    var model = this.findWhere({slug: slug});
    if (model) {
      var id = model.id;
      model.id = slug;
      model.fetch()
    } else {
      model = new this.model({id: slug, slug: slug});
      model.fetch({
        success: function(some, thing){
          this.remove(model);
          this.add(model, { merge: true });
        }.bind(this)
      })
    };

    return model;
  }
})

_.extend(RendezZoo.Collections.Groups.prototype, RendezZoo.Mixins.createGetOrFetch);
