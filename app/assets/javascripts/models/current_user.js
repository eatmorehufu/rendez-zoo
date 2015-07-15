RendezZoo.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: "api/current_user",

  parse: function(response) {
    console.log(response);

    return response;
  }
})
