RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  eventFormTemplate: JST['events/_form'],
  eventDetailTemplate: JST['events/_show'],
  groupEditTemplate: JST['groups/_form'],
  memberDetailTemplate: JST['users/_show'],
  miniMemberTemplate: JST['users/_thumb'],
  memberIndexTemplate: JST['users/index'],
  userIndexListItemTemplate: JST['users/_index_list_item'],
  upcomingEventMiniTemplate: JST['events/_upcoming_list_item'],
  pastEventMiniTemplate: JST['events/_past_list_item'],
  usersGroupsListItemTemplate: JST['users/_member_groups_list_item'],
  photoItemTemplate: JST['photos/_index_item'],
  photoIndexTemplate: JST['photos/index'],
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
    "submit .group-form": "submit",
    "click .toggle-upcoming": "toggleUpcoming",
    "click .toggle-past": "togglePast",
    "click .add-photo": "addPhoto"
  },

  initialize: function(options){
    this.$el.addClass("group-main");
    this.subPage = options.subPage;
    this.subModel = options.subModel;
    this.photos = new RendezZoo.Collections.Photos({ group: this.model });
    this.photos.fetch();
    this.listenTo(this.photos, 'add', this.render);
  },

  render: function() {
    switch (this.subPage) {
      case "newEvent":
        this.newEvent();
        break;
      case "editEvent":
        this.editEvent();
        break;
      case "editGroup":
        this.$el.html(this.groupEditTemplate({
          group: this.model,
          heading: "Edit Group",
          buttonText: "Save Edits"
        }));
        break;
      case "eventDetail":
        this.eventDetail();
        break;
      case "memberIndex":
        this.memberIndex();
        break;
      case "memberDetail":
        this.memberDetail();
        break;
      case "photosIndex":
        this.photosIndex();
        break;
      break;
      default:
        if (this.model.get('description')) {
          var desc = this.model.escape('description').replace(/\n/g, "\<br\> \n")
        }
        this.$el.html(this.templateTop({
          group: this.model,
          currentUser: RendezZoo.currentUser,
          desc: desc
        }));
        var mainBottom = this.templateBottom({ group: this.model });
    }

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

      error: function(){
      }
    })
  },

  toggleRSVP: function(event){
    event.preventDefault();
    if (RendezZoo.currentUser.isNew()) {
      alert("Please sign in!");
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

    this.$el.html(this.eventFormTemplate({
      groupEvent: this.subModel,
      buttonText: buttonText,
      heading: heading
    }));
  },

  editEvent: function() {
    var heading = "Edit Event"
    var buttonText = "Edit Event"

    this.$el.html(this.eventFormTemplate({
      groupEvent: this.subModel,
      buttonText: buttonText,
      heading: heading
    }));
  },

  eventDetail: function() {
    var startTime = this.formatTime(this.subModel.get('start_time'));
    var endTime = this.formatTime(this.subModel.get('end_time'));
    var rsvpText = this.subModel.attendees().get(RendezZoo.currentUser.id) ? "Cancel RSVP" : "RSVP";
    var locLink = this.generateLocLink();
    this.$el.html(this.eventDetailTemplate({
      group: this.model,
      groupEvent: this.subModel,
      startTime: startTime,
      endTime: endTime,
      rsvpText: rsvpText,
      locLink: locLink
    }));
  },

  memberIndex: function() {
    this.$el.html(this.memberIndexTemplate({
      group: this.model,
      flair: RendezZoo.capitalize(this.model.escape('flair'))
    }));
    this.attachMembers(this.model.groupOrganizers(), '.group-organizer-index')
    this.attachMembers(this.model.groupMembers(), '.group-member-index');
  },

  attachMembers: function(members, domEl) {
    members.forEach(function(groupMember){
      var joinDate = this.formatTime(groupMember.escape('joined_at'));
      this.$(domEl).append(this.userIndexListItemTemplate({
        group: this.model,
        member: groupMember,
        joinDate: joinDate
      }))
    }.bind(this));
  },

  memberDetail: function() {
    var timeParse = this.formatTime(this.subModel.get('created_at'));
    this.$el.html(this.memberDetailTemplate({
      user: this.subModel,
      timeParse: timeParse
    }));
    this.attachMemberships(this.subModel.organizerGroups(), '.organizer-memberships');
    this.attachMemberships(this.subModel.memberGroups(), '.group-memberships');
  },

  attachUpcoming: function() {
    this.model.groupEvents().upcomingEvents().forEach(function(groupEvent){
      var startTime = this.formatTime(groupEvent.get('start_time'));
      var endTime = this.formatTime(groupEvent.get('end_time'));
      this.$('.upcoming-events-mini > ul').append(this.upcomingEventMiniTemplate({
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
      this.$('.past-events-mini > ul').append(this.pastEventMiniTemplate({
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
    this.$el.html(this.photoIndexTemplate());
    this.shovelPhotos();
  },

  shovelPhotos: function () {
    var i = 1;
    var columnRoot = ".photos-list.col";
    this.photos.forEach(function(photo){
      this.$(columnRoot + i ).append(this.photoItemTemplate({ photo: photo }))
      i = (i % 3) + 1;
    }.bind(this));
  },

  addPhoto: function(event){
    event.preventDefault();
    var file = this.$("#group-pic")[0].files[0];
    if (file) {
      var formData = new FormData();
      formData.append("photo[pic]", file);
      var newPhoto = new RendezZoo.Models.Photo({ group: this.photos.group });
      newPhoto.saveFormData(formData, {
        success: function(){
          console.log(newPhoto)
          this.photos.add(newPhoto, { merge: true });
          this.$('#group-pic').val('');
        }.bind(this)
      });
    }
  },

  toggleUpcoming: function () {
    this.$('.upcoming-events-mini').toggleClass("collapsed");
    this.$('.past-events-mini').addClass("collapsed");
  },

  togglePast: function () {
    this.$('.upcoming-events-mini').addClass("collapsed");
    this.$('.past-events-mini').toggleClass("collapsed");
  }

});

_.extend(RendezZoo.Views.GroupShowMainSub.prototype, RendezZoo.Mixins.formatTime);
_.extend(RendezZoo.Views.GroupShowMainSub.prototype, RendezZoo.Mixins.groupFormSubmit);
_.extend(RendezZoo.Views.GroupShowMainSub.prototype, RendezZoo.Mixins.AttachMemberships);
