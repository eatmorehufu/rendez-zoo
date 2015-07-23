RendezZoo.Views.PhotosIndex = Backbone.CompositeView.extend({
  template: JST['photos/index'],

  events: {
    "click .add-photo": "addPhoto",
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render)
  },
  render: function(){
    this.$el.html(this.template({ photos: this.collection }));

    return this;
  },

  addPhoto: function(event){
    event.preventDefault();
    var file = this.$("#group-pic")[0].files[0];
    if (file) {
      var formData = new FormData();
      formData.append("photo[pic]", file);
      var newPhoto = new RendezZoo.Models.Photo({ group: this.collection.group });
      newPhoto.saveFormData(formData, {
        success: function(){
          this.collection.add(newPhoto, { merge: true });
          this.$('#group-pic').val('');
        }.bind(this)
      });
    }
  }
})
