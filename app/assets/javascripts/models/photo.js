RendezZoo.Models.Photo = Backbone.Model.extend({
  urlRoot: function(){
    return "/api/groups/" + this.group.id + "/photos"
  },

  initialize: function(options){
    this.group = options.group
  }
})
