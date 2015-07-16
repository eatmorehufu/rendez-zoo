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
    this.subPage = options.subPage;
    this.subModel = options.subModel;
  },

  render: function() {
    switch (this.subPage) {
      case "newEvent":
        var mainTop = this.newEventTemplate();
        break;
      case "eventDetail":
        var mainTop = this.eventDetailTemplate({ groupEvent: this.subModel });
        break;
      case "memberIndex":
        var mainTop = this.memberIndex();
        break;
      case "memberDetail":
        var mainTop = this.memberDetail();
        break;
      default:
        var mainTop = this.templateTop({ group: this.model, currentUser: RendezZoo.currentUser });
        if (this.subPage === "upcoming") {

        } else if (this.subPage === "past") {

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
    if (RendezZoo.currentUser.isNew()) {
      alert("please sign in!");
    } else if (this.subModel.attendees().get(RendezZoo.currentUser.id)) {
      $.ajax({
        url: "/api/events/" + this.subModel.id + "/unrsvp",
        dataType: 'json',
        type: "DELETE",
        success: function(result){
          alert("No longer attending the event!")
          this.subModel.attendees().remove(RendezZoo.currentUser)
          RendezZoo.currentUser.rsvpEvents().remove(this.subModel)
          this.render();
        }.bind(this)
      });
    } else {
      $.ajax({
        url: "/api/events/" + this.subModel.id + "/rsvp",
        dataType: 'json',
        type: "POST",
        success: function(result){
          alert("Attending the event!")
          this.subModel.attendees().add(RendezZoo.currentUser)
          RendezZoo.currentUser.rsvpEvents().add(this.subModel)
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
