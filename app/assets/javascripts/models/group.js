RendezZoo.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups/",

  groupEvents: function(){
    if (!this._events) {
      this._events = new RendezZoo.Collections.Events({group: this})
    }

    return this._events
  }
})
