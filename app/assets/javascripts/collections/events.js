RendezZoo.Collections.Events = Backbone.Collection.extend({
  url: "api/events",
  model: RendezZoo.Models.Event,

  getOrFetch: function(id) {
    var groupEvent = this.get(id);
    if (groupEvent){
      groupEvent.fetch();
    } else {
      groupEvent = new RendezZoo.Models.Event({ id: id});
      groupEvent.fetch({
        success: function(){
          this.remove(groupEvent);
          this.add(groupEvent, { merge: true });
        }.bind(this)
      })
    }

    return groupEvent;
  }
})
