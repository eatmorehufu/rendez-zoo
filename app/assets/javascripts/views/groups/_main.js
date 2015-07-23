RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  eventFormTemplate: JST['events/_form'],
  eventDetailTemplate: JST['events/_show'],
  groupEditTemplate: JST['groups/_form'],
  memberDetailTemplate: JST['users/_show'],
  miniMemberTemplate: JST['users/_thumb'],
  memberIndexTemplate: JST['users/index'],
  upcomingEventMiniTemplate: JST['events/_upcoming_list_item'],
  pastEventMiniTemplate: JST['events/_past_list_item'],
  tagName: "section",
  address_vars: [
    "loc_name",
    "street1",
    "street2",
    "city",
    "state",
    "zip_code"
  ],

  events: {
    "submit .event-form": "saveEvent",
    "click .rsvp-button": "toggleRSVP",
    "submit .group-form": "submit"
  },

  initialize: function(options){
    this.$el.addClass("group-main");
    this.subPage = options.subPage;
    this.subModel = options.subModel;
  },

  render: function() {
    switch (this.subPage) {
      case "newEvent":
        var mainTop = this.newEvent();
        break;
      case "editEvent":
        var mainTop = this.editEvent();
        break;
      case "editGroup":
        var mainTop = this.groupEditTemplate({ group: this.model, heading: "Edit Group", buttonText: "Save Edits"})
        break;
      case "eventDetail":
        var mainTop = this.eventDetail();
        break;
      case "memberIndex":
        var mainTop = this.memberIndex();
        break;
      case "memberDetail":
        var mainTop = this.memberDetail();
        break;
      case "photosIndex":
        var mainTop = this.photosIndex();
        break;
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

      this.attachMemberMini();
      this.attachUpcoming();
      this.attachPast();
    }

    return this;
  },

  saveEvent: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    attrs.event.group_id = this.model.id;
    this.subModel.save(attrs, {
      success: function(){
        this.model.groupEvents().add(this.subModel, { merge: true });
        Backbone.history.navigate("/" + this.model.escape('slug') + "/events/" + this.subModel.id, { trigger: true });
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
    } else if (!this.model.groupMembers().get(RendezZoo.currentUser.id) && !this.model.groupOrganizers().get(RendezZoo.currentUser.id)){
      alert("You don't belong to this group!");
    } else if (this.subModel.attendees().get(RendezZoo.currentUser.id)) {
      this.unRSVPEvent();
    } else {
      this.rsvpEvent();
    }
  },

  newEvent: function() {
    var heading = "Create a new Event"
    var buttonText = "Create Event"
    this.subModel = new RendezZoo.Models.Event();

    return this.eventFormTemplate({
      groupEvent: this.subModel,
      buttonText: buttonText,
      heading: heading
    });
  },

  editEvent: function() {
    var heading = "Edit Event"
    var buttonText = "Edit Event"

    return this.eventFormTemplate({
      groupEvent: this.subModel,
      buttonText: buttonText,
      heading: heading
    });
  },

  eventDetail: function() {
    var startTime = this.formatTime(this.subModel.get('start_time'));
    var endTime = this.formatTime(this.subModel.get('end_time'));
    var rsvpText = this.subModel.attendees().get(RendezZoo.currentUser.id) ? "Cancel RSVP" : "RSVP";
    var locLink = this.generateLocLink();
    return this.eventDetailTemplate({
      group: this.model,
      groupEvent: this.subModel,
      startTime: startTime,
      endTime: endTime,
      rsvpText: rsvpText,
      locLink: locLink
    });
  },

  memberIndex: function() {
    return this.memberIndexTemplate({
      group: this.model,
      members: this.model.groupMembers(),
      organizers: this.model.groupOrganizers()
    })

  },

  memberDetail: function() {
    var timeParse = this.formatTime(this.subModel.get('created_at'));
    return this.memberDetailTemplate({
      user: this.subModel,
      timeParse: timeParse
    })
  },

  attachUpcoming: function() {
    this.model.groupEvents().upcomingEvents().forEach(function(groupEvent){
      var startTime = this.formatTime(groupEvent.get('start_time'));
      var endTime = this.formatTime(groupEvent.get('end_time'));
      this.$('.upcoming-events-mini').append(this.upcomingEventMiniTemplate({
        group: this.model,
        groupEvent: groupEvent,
        startTime: startTime,
        endTime: endTime
      }))
      this.attachAttendees(groupEvent);
    }.bind(this))
  },

  attachPast: function(){
    this.model.groupEvents().pastEvents().forEach(function(groupEvent){
      var startTime = this.formatTime(groupEvent.get('start_time'));
      var endTime = this.formatTime(groupEvent.get('end_time'));
      this.$('.past-events-mini').append(this.pastEventMiniTemplate({
        group: this.model,
        groupEvent: groupEvent,
        startTime: startTime,
        endTime: endTime
      }))
      this.attachAttendees(groupEvent);
    }.bind(this))
  },

  unRSVPEvent: function() {
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
  },

  rsvpEvent: function () {
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
    });
  },

  attachMemberMini: function() {
    var i = 0;
    this.model.groupMembers().forEach(function(groupMember){
      if (i > 6){
        return;
      }
      var content = this.miniMemberTemplate({
        user: groupMember,
        group: this.model
      });
      this.$('.group-show-top-nav > .member-thumbs').append(content);
      i++;
    }.bind(this))
    this.model.groupOrganizers().forEach(function(groupOrganizer){
      if (i > 6){
        return;
      }
      var content = this.miniMemberTemplate({
        user: groupOrganizer,
        group: this.model
      });
      this.$('.group-show-top-nav > .member-thumbs').append(content);
      i++;
    }.bind(this))
  },

  attachAttendees: function(groupEvent) {
    var numThumbs = (groupEvent.attendees().length > 6) ? 6 : groupEvent.attendees().length;
    for (var i = 0; i < numThumbs; i++ ) {
      var content = this.miniMemberTemplate({
        user: groupEvent.attendees().at(i),
        group: this.model
      })
      this.$(".member-thumbs[data-event-id=" + groupEvent.id + "]").append(content)
    }
  },

  generateLocLink: function() {
    var locString = "";
    for (var i = 0; i < this.address_vars.length; i++) {
      var address_component = this.subModel.escape(this.address_vars[i])
      if (address_component) {
        locString += address_component + " "
      }
    }

    return locString.slice(0, -1);
  },

  photosIndex: function () {
    var photos = new RendezZoo.Collections.Photos({ group: this.model });
    photos.fetch();

    var photosIndexView = new RendezZoo.Views.PhotosIndex({ collection: photos });

    return photosIndexView.render().$el;
  }

});

_.extend(RendezZoo.Views.GroupShowMainSub.prototype, RendezZoo.Mixins.formatTime);
_.extend(RendezZoo.Views.GroupShowMainSub.prototype, RendezZoo.Mixins.groupFormSubmit);
