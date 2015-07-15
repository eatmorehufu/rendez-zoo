RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  newEventTemplate: JST['events/_new'],
  tagName: "section",

  initialize: function(options){
    this.$el.addClass("group-main");
    this.subPage = options.subPage;
  },

  render: function() {
    if (this.subPage === "newEvent") {
      var mainTop = this.newEvent();
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

  newEvent: function() {
    var newEvent = new RendezZoo.Models.Event({collection: this.model.groupEvents()})

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
