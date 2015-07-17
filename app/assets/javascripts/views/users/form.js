RendezZoo.Views.UsersForm = Backbone.CompositeView.extend({
  template: JST['users/form'],
  tagName: "section",
  events: {
    "submit form" : "submit"
  },

  initialize: function(options){
    this.$el.addClass("new-user group");
  },
  render: function () {
    this.$el.html(this.template());

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()
    console.log(attrs)
    $.ajax({
      url: "/api/users/",
      type: "POST",
      data: attrs,
      dataType: 'json',
      success: function(data){
        RendezZoo.currentUser.set(data);
      },
      error: function(){
      }
    });
  }
})
