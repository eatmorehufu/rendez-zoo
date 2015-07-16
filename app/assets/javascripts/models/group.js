RendezZoo.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups/",

  parse: function(response){
    this.groupEvents().set(response.groupEvents);
    this.groupMembers().set(response.members);
    this.groupOrganizers().set(response.organizers);

    delete response.members;
    delete response.organizers;
    delete response.groupEvents;
    return response
  },

  groupEvents: function(){
    if (!this._groupEvents) {
      this._groupEvents = new RendezZoo.Collections.Events({ group: this })
    }

    return this._groupEvents
  },

  groupMembers: function() {
    if (!this._groupMembers) {
      this._groupMembers = new RendezZoo.Collections.Members({ group: this })
    }

    return this._groupMembers
  },

  groupOrganizers: function() {
    if (!this._groupOrganizers) {
      this._groupOrganizers = new RendezZoo.Collections.Members({ group: this })
    }

    return this._groupOrganizers
  }
})
