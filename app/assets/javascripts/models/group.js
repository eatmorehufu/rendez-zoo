RendezZoo.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups/",

  parse: function(response){
    this.groupEvents().set(response.groupEvents, { parse: true });
    this.groupMembers().set(response.members);
    this.groupOrganizers().set(response.organizers);
    this.groupCategories().set(response.categories);
    delete response.categories;
    delete response.members;
    delete response.organizers;
    delete response.groupEvents;
    return response;
  },

  groupEvents: function(){
    if (!this._groupEvents) {
      this._groupEvents = new RendezZoo.Collections.Events({ group: this });
    };

    return this._groupEvents;
  },

  groupMembers: function() {
    if (!this._groupMembers) {
      this._groupMembers = new RendezZoo.Collections.Users({ group: this });
    };

    return this._groupMembers;
  },

  groupOrganizers: function() {
    if (!this._groupOrganizers) {
      this._groupOrganizers = new RendezZoo.Collections.Users({ group: this });
    };

    return this._groupOrganizers;
  },

  groupCategories: function(){
    if (!this._groupCategories){
      this._groupCategories = new RendezZoo.Collections.Categories({group: this});
    }

    return this._groupCategories;
  }

})

_.extend(RendezZoo.Models.Group.prototype, RendezZoo.Mixins.formData);
