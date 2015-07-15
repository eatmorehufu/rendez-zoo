RendezZoo.Views.NewGroup = Backbone.CompositeView.extend({
  template: JST['groups/new'],

  events: {
    "submit .create-new-group": "submitForm"
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  submitForm: function(event){
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON().group;
    this.model.save(attrs, {
      success: function(){
        RendezZoo.groups.add(this.model);
        Backbone.history.navigate("/groups/" + this.model.id, { trigger: true });
      }.bind(this)
    })
  }
})
