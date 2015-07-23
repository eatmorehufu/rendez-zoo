RendezZoo.Collections.Photos = Backbone.Collection.extend({
  url: function(){
    return "/api/groups/" + this.group.escape('slug') + "/photos"
  },

  model: RendezZoo.Models.Photo,

  initialize: function (options){
    this.group = options.group
  }
})
