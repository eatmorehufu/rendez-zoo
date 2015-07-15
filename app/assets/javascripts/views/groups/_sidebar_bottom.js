RendezZoo.Views.GroupSidebarBottomSub = Backbone.CompositeView.extend({
  template: JST['groups/_sidebar_bottom'],

  render: function() {
    var content = this.template({ group: this.model })
    this.$el.html(content);

    return this;
  }
})
