RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  newEventTemplate: JST['events/_new'],
  eventDetailTemplate: JST['events/_show'],
  tagName: "section",

  events: {
    "submit .new-event-form": "newEvent",
    "click .rsvp-button": "toggleRSVP"
  },

  initialize: function(options){
    this.$el.addClass("group-main");
    this._subPage = options.subPage;
    this._subModel = options.subModel;
    this._currentUser = options.currentUser;
  },

  render: function() {
    switch (this._subPage) {
      case "newEvent":
        var mainTop = this.newEventTemplate();
        break;
      case "eventDetail":
        this._subModel.fetch();
        var mainTop = this.eventDetailTemplate({ groupEvent: this._subModel });
        break;
      case "memberIndex":
        var mainTop = this.memberIndex();
        break;
      case "memberDetail":
        var mainTop = this.memberDetail();
        break;
      default:
        var mainTop = this.templateTop({ group: this.model, currentUser: this._currentUser });
        if (this._subPage === "upcoming") {

        } else if (this._subPage === "past") {

        } else {
          var mainBottom = this.templateBottom({ group: this.model });
        }
    }
    this.$el.html(mainTop);
    mainBottom && this.$el.append(mainBottom);

    return this;
  },

  newEvent: function(event) {
    event.preventDefault();
    var testEvent = new RendezZoo.Models.Event();
    var attrs = $(event.currentTarget).serializeJSON().event;
    attrs.group_id = this.model.id;
    testEvent.save(attrs, {
      success: function(){
        this.model.groupEvents().add(testEvent, { merge: true });
        Backbone.history.navigate("/groups/" + this.model.id + "/events/" + testEvent.id, { trigger: true });
      }.bind(this),

      fail: function(){
        alert("whoops");
      }
    })
  },

  toggleRSVP: function(event){
    event.preventDefault();
    if (!this.currentUser) {
      alert("please sign in!");
    } else if (this._subModel.attendees().get(this.currentUser.id)) {
      $.ajax({
        url: "/api/events/" + this.model.id + "/unrsvp",
        dataType: 'json',
        type: "DELETE",
        success: function(result){
          alert("No longer attending the event!")
          this._subModel.attendees().remove(this.currentUser)
          this.render();
        }.bind(this)
      });
    } else {
      $.ajax({
        url: "/api/events/" + this.model.id + "/rsvp",
        dataType: 'json',
        type: "POST",
        success: function(result){
          alert("Attending the event!")
          this.model.groupMembers().add(this.currentUser)
          this.render();
        }.bind(this)
      })
    }
  },

  upcomingEvents: function(){

  },

  pastEvents: function(){

  },

  memberIndex: function() {

  },

  memberDetail: function() {

  }
})
