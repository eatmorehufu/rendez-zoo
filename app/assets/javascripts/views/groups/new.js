RendezZoo.Views.NewGroup = Backbone.CompositeView.extend({
  template: JST['groups/_form'],
  helperNewTemplate: JST['groups/new'],

  events: {
    "submit form": "submit"
  },

  initialize: function (options) {
    this.$el.addClass("pad-twenty")
  },

  render: function(){
    var content = this.template({group: this.model, heading: "New Group", buttonText: "Create Group"});
    this.$el.html(content);
    this.$(".group-form-header").append(this.helperNewTemplate());

    return this;
  }

});

_.extend(RendezZoo.Views.NewGroup.prototype, RendezZoo.Mixins.fileInput);
_.extend(RendezZoo.Views.NewGroup.prototype, RendezZoo.Mixins.groupFormSubmit);
