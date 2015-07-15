RendezZoo.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  bannerTemplate: JST['groups/_banner'],
  tagName: "section",

  initialize: function(options) {
    this._currentUser = options.currentUser;
    this.$el.addClass("group-show-main group");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.currentUser, 'sync', this.render);
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
      group: this.model
    });

    this.$el.append(groupShowMainView.render().$el);

    return this;
  }
})
