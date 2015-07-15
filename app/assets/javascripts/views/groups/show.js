RendezZoo.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['groups/show'],

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ group:this.model });
    this.$el.html(content);

    return this;
  }
})
