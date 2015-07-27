RendezZoo.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  innerTemplate: JST['users/_show'],
  userPicUpload: JST['users/_picForm'],
  usersGroupsListItemTemplate: JST['users/_member_groups_list_item'],
  pencilButtonTemplate: JST['users/_pencil_button'],
  usernameLocTemplate: JST['users/_username_loc_input'],
  bioEditTemplate: JST['users/_bioedit'],
  tagName: "article",

  events: {
    "submit .userEditForm": "submit",
    "change #input-user-avatar": "fileInputChange",
    "click .pencil": "editInPlace",
    "blur .user-edit": "saveEdit",
    "submit .user-edit": "saveEdit"
  },

  initialize: function(options){
    this.$el.addClass("current-user-profile");
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var timeParsed = this.formatTime(this.model.get('created_at'));
    this.$el.html(this.template());
    this.$('.user-profile').html(this.innerTemplate({ user: this.model, timeParse: timeParsed }));
    this.$('.profile-picture').append(this.userPicUpload());
    this.attachMemberships(this.model.organizerGroups(), '.organizer-memberships');
    this.attachMemberships(this.model.memberGroups(), '.group-memberships');
    this.attachPencils();
    return this;
  },

  submit: function(event){
    event.preventDefault();

    var file = this.$("#input-user-avatar")[0].files[0];

    var formData = new FormData();
    formData.append("user[avatar]", file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(model, resp){
        RendezZoo.currentUser.set(resp);
        this.render();
      }.bind(this)
    });
  },

  attachPencils: function() {
    var view = this;
    this.$('.attach-pencil').each(function(index){
      var data = $(this).data('field');
      $(this).append(view.pencilButtonTemplate({ data: data }))
    })
  },

  editInPlace: function(event) {
    event.preventDefault();
    var formName = $(event.currentTarget).data("field");
    if (formName === "username" || formName === "zip_code") {
      this.$('.attach-pencil.' + formName).html(this.usernameLocTemplate({
        field: formName,
        value: RendezZoo.currentUser.get(formName)
      }));
      this.$('.attach-pencil.' + formName + " input").focus();
    } else if (formName === "description") {
      this.$('p.description').html(this.bioEditTemplate({
        value: RendezZoo.currentUser.get('description')
      }));
      this.$('p.description textarea').focus();
    }
  },

  saveEdit: function(event){
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()
    $.ajax({
      url: "/api/users/" + RendezZoo.currentUser.id,
      method: "PUT",
      data: attrs,
      success: function(model) {
        RendezZoo.currentUser.set(model);
        this.model.set(model);
        this.render();
      }.bind(this)
    })
  }

})

_.extend(RendezZoo.Views.UserShow.prototype, RendezZoo.Mixins.fileInput)
_.extend(RendezZoo.Views.UserShow.prototype, RendezZoo.Mixins.formatTime)
_.extend(RendezZoo.Views.UserShow.prototype, RendezZoo.Mixins.AttachMemberships)
