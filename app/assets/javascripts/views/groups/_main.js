RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  newEventTemplate: JST['events/_new'],
  eventDetailTemplate: JST['events/_show'],
  groupEditTemplate: JST['groups/new'],
  upcomingEventMiniTemplate: JST['events/_upcoming_list_item'],
  pastEventMiniTemplate: JST['events/_past_list_item'],
  tagName: "section",

  events: {
    "submit .event-form": "saveEvent",
    "click .rsvp-button": "toggleRSVP",
    "submit .group-form": "saveGroup"
  },

  initialize: function(options){
    this.$el.addClass("group-main");
    this.subPage = options.subPage;
    this.subModel = options.subModel;
  },

  render: function() {
    switch (this.subPage) {
      case "newEvent":
        var heading = "Create a new Event"
        var buttonText = "Create Event"
        this.subModel = new RendezZoo.Models.Event();
        var mainTop = this.newEventTemplate({groupEvent: this.subModel, buttonText: buttonText, heading: heading});
        break;
      case "editEvent":
        var heading = "Edit Event"
        var buttonText = "Edit Event"
        var mainTop = this.newEventTemplate({ groupEvent: this.subModel, buttonText: buttonText, heading: heading });
        break;
      case "editGroup":
        var mainTop = this.groupEditTemplate({ group: this.model, heading: "Edit Group", buttonText: "Save Edits"})
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
        var mainTop = this.templateTop({
          group: this.model,
          currentUser: RendezZoo.currentUser,
        });
        var mainBottom = this.templateBottom({ group: this.model });
    }

    this.$el.html(mainTop);

    if (mainBottom) {
      this.$el.append(mainBottom);
      this.model.groupEvents().forEach(function(groupEvent){
        this.$('.upcoming-events-mini').append(this.upcomingEventMiniTemplate({
          group: this.model,
          groupEvent: groupEvent
        }))
      }.bind(this))

      this.model.groupEvents().forEach(function(groupEvent){
        this.$('.past-events-mini').append(this.pastEventMiniTemplate({
          group: this.model,
          groupEvent: groupEvent
        }))
      }.bind(this))
    }

    this.$(".datepicker").datepicker();
    this.$(".timepicker").timepicker();
    return this;
  },

  saveEvent: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    attrs.event.group_id = this.model.id;
    this.subModel.save(attrs, {
      success: function(){
        this.model.groupEvents().add(this.subModel, { merge: true });
        Backbone.history.navigate("/groups/" + this.model.id + "/events/" + this.subModel.id, { trigger: true });
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

  saveGroup: function(event){
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.save(attrs, {
      success: function(){
        RendezZoo.groups.add(this.model, { merge: true });
        Backbone.history.navigate("/groups/" + this.model.id, { trigger: true });
      }.bind(this)
    })
  },

  memberIndex: function() {

  },

  memberDetail: function() {

  }
})
