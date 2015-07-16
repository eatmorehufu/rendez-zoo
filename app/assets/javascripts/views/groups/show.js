RendezZoo.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  bannerTemplate: JST['groups/_banner'],
  tagName: "section",

  events: {
    "click button.join-leave-button": "joinOrLeave"
  },

  initialize: function(options) {
    this.currentUser = options.currentUser;
    this.$el.addClass("group-show-main group");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.currentUser, 'sync', this.render);
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
    var bannercontent = this.bannerTemplate({
      group: this.model,
      currentUser: this.currentUser
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
      currentUser: this.currentUser
    });

    this.$el.append(groupShowMainView.render().$el);

    return this;
  },

  joinOrLeave: function(event) {
    event.preventDefault();
    if (!this.currentUser) {
      alert("please sign in!");
    } else if (this.model.get('owner_id') === this.currentUser.id) {
      alert("Can't leave a group you own or organize!");
    } else if (this.model.groupOrganizers().get(this.currentUser.id)) {
      alert("Consider resigning from the organizer position first?");
    } else if (this.model.groupMembers().get(this.currentUser.id)) {
      $.ajax({
        url: "/api/groups/" + this.model.id + "/leave",
        dataType: 'json',
        type: "DELETE",
        success: function(result){
          alert("Left the group!")
        }
      });
    } else {

    }
  }
})
