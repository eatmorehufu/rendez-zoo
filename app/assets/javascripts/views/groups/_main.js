RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  tagName: "section",

  initialize: function(options){
    this.$el.addClass("group-main");
    this.subPage = options.subPage;
  },

  render: function() {

    var mainTop = this.templateTop({ group: this.model });
    var mainBottom = this.templateBottom({ group: this.model });
    this.$el.html(mainTop);
    this.$el.append(mainBottom);
    return this;
  },

  newEvent: function() {
    var newEvent = new RendezZoo.Models.Event({collection: group.groupEvents()})
  },

  upcomingEvents: function(){

  },

  pastEvents: function(){

  },

  memberIndex: function() {

  }
})
