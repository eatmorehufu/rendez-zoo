RendezZoo.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups/",

  parse: function(response){
    console.log(response)


    return response
  },

  events: function(){
    if (!this._events) {
      this._events = new RendezZoo.Collections.Events({group: this})
    }

    return this._events
  }
})
