RendezZoo.Views.GroupSidebarTopSub = Backbone.CompositeView.extend({
  template: JST['groups/_sidebar_top'],
  tagName: "section",

  initialize: function(options){
    this.$el.attr('id', 'sidebar-top');
  },

  render: function() {
    var content = this.template({
      group: this.model,
      flair: RendezZoo.capitalize(this.model.escape('flair'))
    })
    this.$el.html(content);

    return this;
  }
})
