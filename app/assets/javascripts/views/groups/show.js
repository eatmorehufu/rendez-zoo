RendezZoo.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  bannerTemplate: JST['groups/_banner'],
  tagName: "section",
  joinOrLeaveButtonTemplate: JST['groups/_join_button'],
  addEventLinkTemplate: JST['events/_add_link'],
  editGroupLinkTemplate: JST['groups/_edit_link'],

  events: {
    "click button.join-leave-button": "joinOrLeave"
  },

  initialize: function(options) {
    this.$el.addClass("group-show-main group");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(RendezZoo.currentUser, 'signIn signOut', this.render);
    this.subPage = options.subPage;
    options.subId && this.bindModels(options.subId);
  },

  bindModels: function(subId) {
    if (this.subPage === "eventDetail" || this.subPage === "editEvent") {
      this.subModel = this.model.groupEvents().getOrFetch(subId);
    };

    if (this.subPage === "memberDetail") {
      this.subModel = RendezZoo.users.getOrFetch(subId);
    };

    this.listenTo(this.subModel, 'sync', this.render.bind(this));
  },

  render: function() {
    var content = this.template({ group: this.model });
    this.$el.html(content);

    var bannercontent = this.bannerTemplate({
      group: this.model,
      currentUser: RendezZoo.currentUser,
    });
    this.$('#group-banner-header').html(bannercontent);
    this.setBannerButtons();
    this.highlightHeader();

    var sidebarTopView = new RendezZoo.Views.GroupSidebarTopSub({
      model: this.model
    });
    // var sidebarBottomView = new RendezZoo.Views.GroupSidebarBottomSub({
    //   model: this.model
    // });

    this.$('#group-sidebars').append(sidebarTopView.render().$el);
    // this.$('#group-sidebars').append(sidebarBottomView.render().$el);

    var groupShowMainView = new RendezZoo.Views.GroupShowMainSub({
      model: this.model,
      subPage: this.subPage,
      subModel: this.subModel
    });

    this.$('#group-main-content').append(groupShowMainView.render().$el);
    return this;
  },

  setBannerButtons: function(){
    if (this.model.groupOrganizers().get(RendezZoo.currentUser.id)){
      var buttonActive = "disabled";
      var buttonText = "Leave";
      this.$('.group-banner-buttons').html(this.addEventLinkTemplate({ group: this.model }));
    } else if (this.model.groupMembers().get(RendezZoo.currentUser.id)) {
      var buttonText = "Leave";
      var buttonActive = "";
    } else {
      var buttonText = "Join";
    };
    this.$('.group-banner-buttons').append(this.joinOrLeaveButtonTemplate({
      buttonText: buttonText,
      buttonActive: buttonActive
    }));
    if (this.model.get('owner_id') === RendezZoo.currentUser.id) {
      this.$('.group-banner-buttons').prepend(this.editGroupLinkTemplate({group: this.model}))
    }
  },

  joinOrLeave: function(event) {
    event.preventDefault();
    if (RendezZoo.currentUser.isNew()) {
      alert("Please sign in!");
    } else if (this.model.get('owner_id') === RendezZoo.currentUser.id) {
      alert("Can't leave a group you own or organize!");
    } else if (this.model.groupOrganizers().get(RendezZoo.currentUser.id)) {
      alert("Consider resigning from the organizer position first?");
    } else if (this.model.groupMembers().get(RendezZoo.currentUser.id)) {
      this.leaveGroup();
    } else {
      this.joinGroup();
    };
  },

  leaveGroup: function(){
    $.ajax({
      url: "/api/groups/" + this.model.id + "/leave",
      dataType: 'json',
      type: "DELETE",
      success: function(result){
        this.model.groupMembers().remove(RendezZoo.currentUser)
        RendezZoo.currentUser.memberGroups().remove(this.model)
        this.render();
      }.bind(this)
    });
  },

  joinGroup: function (){
    $.ajax({
      url: "/api/groups/" + this.model.id + "/join",
      dataType: 'json',
      type: "POST",
      success: function(result){
        this.model.groupMembers().add(RendezZoo.currentUser)
        RendezZoo.currentUser.memberGroups().add(this.model)
        this.render();
      }.bind(this)
    });
  },

  highlightHeader: function() {
    switch (this.subPage) {
      case "memberIndex":
        this.$('#members-link').addClass('highlighted');
        break;
      case "photosIndex":
        this.$('#photos-link').addClass('highlighted');
        break;
    }
    if (!this.subPage) {
      this.$('#home-link').addClass('highlighted');
    }
  }
})
