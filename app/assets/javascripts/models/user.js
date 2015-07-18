RendezZoo.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function(response) {
    response.memberGroups && this.memberGroups().set(response.memberGroups);
    response.organizerGroups && this.organizerGroups().set(response.organizerGroups);
    response.rsvpEvents && this.rsvpEvents().set(response.rsvpEvents);

    delete response.memberGroups;
    delete response.rsvpEvents;
    delete response.organizerGroups;

    return response;
  },

  memberGroups: function(){
    if (!this._memberGroups){
      this._memberGroups = new RendezZoo.Collections.Groups({ member: this });
    };

    return this._memberGroups;
  },

  organizerGroups: function(){
    if (!this._organizerGroups) {
      this._organizerGroups = new RendezZoo.Collections.Groups({ organizer: this });
    };

    return this._organizerGroups;
  },

  rsvpEvents: function() {
    if (!this._rsvpEvents) {
      this._rsvpEvents = new RendezZoo.Collections.Events({ member: this });
    }

    return this._rsvpEvents;
  }
})

RendezZoo.Models.CurrentUser = RendezZoo.Models.User.extend({
  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },


  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: 'json',
      success: function(data){
        model.parse(data);
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;
    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.memberGroups().reset();
        model.organizerGroups().reset();
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function() {
    if (this.isSignedIn()){
      RendezZoo.currentUser.trigger("signIn");
    } else {
      RendezZoo.currentUser.trigger("signOut");
    }
  },

  signUp: function(options) {
    $.ajax({
      url: "/api/users/",
      type: "POST",
      data: options,
      dataType: 'json',
      success: function(data){
        RendezZoo.currentUser.set(data);
      },
      error: function(){
      }
    });
  }

})
