RendezZoo.Views.GroupSidebarTopSub = Backbone.CompositeView.extend({
  template: JST['groups/_sidebar_top'],

  render: function() {
    var content = this.template({ group: this.model })
    this.$el.html(content);
    
    return this;
  }
})
