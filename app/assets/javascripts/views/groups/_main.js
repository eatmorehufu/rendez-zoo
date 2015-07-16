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

  upcomingEvents: function(){

  },

  pastEvents: function(){

  },

  memberIndex: function() {

  },

  memberDetail: function() {

  }
})
