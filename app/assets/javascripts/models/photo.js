RendezZoo.Models.Photo = Backbone.Model.extend({
  urlRoot: function(){
    return "/api/groups/" + this.group.escape('slug') + "/photos"
  },

  initialize: function(options){
    this.group = options.group
  }
})

_.extend(RendezZoo.Models.Photo.prototype, RendezZoo.Mixins.formData);
