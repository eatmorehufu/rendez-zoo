RendezZoo.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  bannerTemplate: JST['groups/_banner'],
  tagName: "section",

  events: {
    "click button.join-leave-button": "joinOrLeave"
  },

  initialize: function(options) {
    this.$el.addClass("group-show-main group");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(RendezZoo.currentUser, 'sync', this.render);
    this.subPage = options.subPage;
    options.subId && this.bindModels(options.subId);
  },

  bindModels: function(subId) {
    if (this.subPage === "eventDetail") {
      this.subModel = this.model.groupEvents().getOrFetch(subId)
    }

    this.listenTo(this.subModel, 'sync', this.render.bind(this));
  },

  render: function() {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    if (
      this.model.groupOrganizers().get(RendezZoo.currentUser.id) ||
      this.model.groupMembers().get(RendezZoo.currentUser.id)
    ) {
      var buttonText = "Leave";
    } else {
      var buttonText = "Join";
    };

    var bannercontent = this.bannerTemplate({
      group: this.model,
      currentUser: RendezZoo.currentUser,
      buttonText: buttonText
    });
    this.$el.prepend(bannercontent);

    var sidebarTopView = new RendezZoo.Views.GroupSidebarTopSub({
      group: this.model
    });

    var sidebarBottomView = new RendezZoo.Views.GroupSidebarBottomSub({
      group: this.model
    });

    this.$('.group-sidebars').append(sidebarTopView.render().$el);
    this.$('.group-sidebars').append(sidebarBottomView.render().$el);

    var groupShowMainView = new RendezZoo.Views.GroupShowMainSub({
      model: this.model,
      subPage: this.subPage,
      subModel: this.subModel,
      currentUser: RendezZoo.currentUser
    });

    this.$el.append(groupShowMainView.render().$el);

    return this;
  },

  joinOrLeave: function(event) {
    event.preventDefault();
    if (RendezZoo.currentUser.isNew()) {
      alert("please sign in!");
    } else if (this.model.get('owner_id') === RendezZoo.currentUser.id) {
      alert("Can't leave a group you own or organize!");
    } else if (this.model.groupOrganizers().get(RendezZoo.currentUser.id)) {
      alert("Consider resigning from the organizer position first?");
    } else if (this.model.groupMembers().get(RendezZoo.currentUser.id)) {
      $.ajax({
        url: "/api/groups/" + this.model.id + "/leave",
        dataType: 'json',
        type: "DELETE",
        success: function(result){
          alert("Left the group!")
          this.model.groupMembers().remove(RendezZoo.currentUser)
          RendezZoo.currentUser.memberGroups().remove(this.model)
          this.render();
        }.bind(this)
      });
    } else {
      $.ajax({
        url: "/api/groups/" + this.model.id + "/join",
        dataType: 'json',
        type: "POST",
        success: function(result){
          alert("Joined the group!")
          this.model.groupMembers().add(RendezZoo.currentUser)
          RendezZoo.currentUser.memberGroups().add(this.model)
          this.render();
        }.bind(this)
      })
    }
  }
})
