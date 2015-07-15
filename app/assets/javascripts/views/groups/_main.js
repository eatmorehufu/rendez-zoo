RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  newEventTemplate: JST['events/_new'],
  tagName: "section",

  events: {
    "submit .new-event-form": "newEvent"
  },

  initialize: function(options){
    this.$el.addClass("group-main");
    this.subPage = options.subPage;
  },

  render: function() {
    if (this.subPage === "newEvent") {
      var mainTop = this.newEventTemplate();
    } else if (this.subPage === "memberIndex") {
      var mainTop = this.memberIndex();
    } else if (this.subPage === "memberDetail") {
      var mainTop = this.memberDetail();
    } else {
      var mainTop = this.templateTop({ group: this.model });
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

  upcomingEvents: function(){

  },

  pastEvents: function(){

  },

  memberIndex: function() {

  },

  memberDetail: function() {

  }
})
