RendezZoo.Collections.Photos = Backbone.Collection.extend({
  url: function(){
    return "/api/groups/" + this.group.id + "/photos"
  },

  model: RendezZoo.Models.Photo,

  initialize: function (options){
    this.group = options.group
  }
})
