RendezZoo.Views.NewGroup = Backbone.CompositeView.extend({
  template: JST['groups/_form'],
  helperNewTemplate: JST['groups/new'],
  tagName: "section",

  events: {
    "submit .group-form": "submitForm"
  },

  initialize: function (options) {
    this.$el.addClass("group-form-main")
  },

  render: function(){
    var content = this.template({group: this.model, heading: "New Group", buttonText: "Create Group"});
    this.$el.html(content);
    this.$(".group-form-header").append(this.helperNewTemplate());

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
