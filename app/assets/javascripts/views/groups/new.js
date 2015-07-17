RendezZoo.Views.NewGroup = Backbone.CompositeView.extend({
  template: JST['groups/new'],

  events: {
    "submit .group-form": "submitForm"
  },

  render: function(){
    var content = this.template({group: this.model, heading: "New Group", buttonText: "Create Group"});
    this.$el.html(content);

    return this;
  },

  submitForm: function(event){
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.save(attrs, {
      success: function(){
        RendezZoo.groups.add(this.model);
        Backbone.history.navigate("/groups/" + this.model.id, { trigger: true });
      }.bind(this)
    })
  }
})
