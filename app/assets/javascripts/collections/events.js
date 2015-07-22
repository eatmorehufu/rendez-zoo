RendezZoo.Collections.Events = Backbone.Collection.extend({
  url: "api/events",
  model: RendezZoo.Models.Event,
  comparator: "start_time",

  pastEvents: function(){
    this._pastEvents = []
    this.forEach(function(groupEvent) {
      if (groupEvent.get('start_time') && Date.parse(groupEvent.get('start_time').slice(0, -5)) < Date.now()){
        this._pastEvents.push(groupEvent);
      }
    }.bind(this))

    return this._pastEvents
  },

  upcomingEvents: function() {
    var pastLimit = this.pastEvents().length;
    var upcoming = [];
    for (var i = pastLimit; i < this.length; i++ ) {
      upcoming.push(this.at(i));
    }

    return upcoming;
  }

})

_.extend(RendezZoo.Collections.Events.prototype, RendezZoo.Mixins.createGetOrFetch);
