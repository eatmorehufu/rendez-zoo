RendezZoo.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  bannerTemplate: JST['groups/_banner'],
  tagName: "section",

  events: {
    "click button.join-leave-button": "joinOrLeave"
  },

  initialize: function(options) {
    this._currentUser = options.currentUser;
    this.$el.addClass("group-show-main group");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this._currentUser, 'sync', this.render);
    this._subPage = options.subPage;
    options.subId && this.bindModels(options.subId);
  },

  bindModels: function(subId) {
    if (this._subPage === "eventDetail") {
      this._subModel = this.model.groupEvents().getOrFetch(subId)
    }

    this.listenTo(this._subModel, 'sync', this.render.bind(this));
  },

  render: function() {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    var bannercontent = this.bannerTemplate({
      group: this.model,
      currentUser: this._currentUser
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
      subPage: this._subPage,
      subModel: this._subModel,
      currentUser: this._currentUser
    });

    this.$el.append(groupShowMainView.render().$el);

    return this;
  },

  joinOrLeave: function(event) {
    event.preventDefault();
    alert("you pushed me!");
  }
})
