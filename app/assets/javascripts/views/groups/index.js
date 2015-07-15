RendezZoo.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],
  tagName: "section",

  initialize: function(options) {
    this.$el.addClass("groups-index")
    
  },

  render: function() {
    var content = this.template({groups: this.collection});
    this.$el.html(content);

    return this;
  }
})
