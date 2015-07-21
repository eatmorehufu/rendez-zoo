RendezZoo.Views.NewGroup = Backbone.CompositeView.extend({
  template: JST['groups/_form'],
  helperNewTemplate: JST['groups/new'],

  events: {
    "submit form": "submit",
    "change #input-user-avatar": "fileInputChange"
  },

  initialize: function (options) {
    this.$el.addClass("pad-twenty")
  },

  render: function(){
    var content = this.template({group: this.model, heading: "New Group", buttonText: "Create Group"});
    this.$el.html(content);
    this.$(".group-form-header").append(this.helperNewTemplate());

    return this;
  },

  submit: function(event){
    event.preventDefault();
    attrs = $(event.currentTarget).serializeJSON().group;
    if (this.validateAttrs(attrs)) {
      var file = this.$("#input-group-avatar")[0].files[0];

      var formData = new FormData();
      file && formData.append("group[avatar]", file);
      formData.append("group[title]", attrs.title);
      formData.append("group[zip_code]", attrs.zip_code);
      formData.append("group[description]", attrs.description);
      var that = this;
      this.model.saveFormData(formData, {
        success: function(){
          RendezZoo.groups.add(this.model, { merge: true });
          RendezZoo.currentUser.organizerGroups().add(this.model, { merge: true });
          Backbone.history.navigate("/groups/" + this.model.id, { trigger: true });
        }.bind(this)
      });
    } else {
      this.$('.errors').html("Please fill out every field. (Image optional)")
    }

  },

  validateAttrs: function(attrs) {
    return attrs.title && attrs.zip_code && attrs.description;
  }
});

_.extend(RendezZoo.Views.NewGroup.prototype, RendezZoo.Mixins.fileInput);
