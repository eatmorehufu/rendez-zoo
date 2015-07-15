RendezZoo.Views.GroupShowMainSub = Backbone.CompositeView.extend({
  templateTop: JST['groups/_show_top'],
  templateBottom: JST['groups/_show_bottom'],
  tagName: "section",

  initialize: function(options){
    this.$el.addClass("group-main")
  }

  render: function() {
    var content = this.template({ group: this.model })
    this.$el.html(content);

    return this;
  }
})
