RendezZoo.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  events: {
    "submit form": "submit",
    "change #input-user-avatar": "fileInputChange"
  },

  initialize: function(options){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var timeParsed = this.formatTime(this.model.get('created_at'));
    this.$el.html(this.template({ user: this.model, timeParse: timeParsed }));

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var file = this.$("#input-user-avatar")[0].files[0];

    var formData = new FormData();
    formData.append("user[avatar]", file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }

})

_.extend(RendezZoo.Views.UserShow.prototype, RendezZoo.fileInputMixin)
_.extend(RendezZoo.Views.UserShow.prototype, RendezZoo.formatTimeMixin)
