RendezZoo.Models.Category = Backbone.Model.extend({
  urlRoot: "/api/categories",

  parse: function(response){
    response.associated_users && this.associatedUsers().set(response.associated_users);
    response.associated_groups && this.associatedGroups().set(response.associated_groups);
    delete response.associated_users;
    delete response.associated_groups;
  },

  associatedUsers: function(){
    if (!this._associatedUsers){
      this._associatedUsers = new RendezZoo.Collections.Users({interest: this});
    }

    return this._associatedUsers
  },

  associatedGroup: function(){
    if (!this._associatedGroups){
      this._associatedGroups = new RendezZoo.Collections.Groups({ category: this });
    }

    return this._associatedGroups
  }
})
