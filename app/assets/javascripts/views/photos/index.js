RendezZoo.Views.PhotosIndex = Backbone.CompositeView.extend({
  template: JST['photos/index'],

  events: {
    "click .add-photo": "addPhoto"
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render)
  },
  render: function(){
    this.$el = this.template({ photos: this.collection })
    return this;
  },

  addPhoto: function(event){
    event.preventDefault();
    alert('clicked add photo!')
  }
})
