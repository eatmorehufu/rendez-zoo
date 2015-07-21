RendezZoo.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],
  memberTemplate: JST['groups/_member_groups'],
  indexTemplate: JST['groups/_index_groups'],
  notLoggedInTemplate: JST['groups/_splash_banner'],
  loggedInTemplate: JST['groups/_user_welcome'],
  tagName: "section",

  initialize: function(options) {
    this.$el.addClass("groups-index");
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(RendezZoo.currentUser, 'signIn signOut', this.render);
  },

  render: function() {
    var content = this.template({groups: this.collection});
    this.$el.html(content);

    if (RendezZoo.currentUser.isSignedIn()) {
      this.$('.index-banner').removeClass("logged-out");
      this.$('.banner-content').html(this.loggedInTemplate({
        currentUser: RendezZoo.currentUser
      }));
      if (RendezZoo.currentUser.organizerGroups().length > 0) {
        this.$('#group-index-body').append(this.memberTemplate({groups: RendezZoo.currentUser.organizerGroups(), heading: "Your Admin Groups"}));
      }
      if (RendezZoo.currentUser.memberGroups().length > 0) {
        this.$('#group-index-body').append(this.memberTemplate({groups: RendezZoo.currentUser.memberGroups(), heading: "Your Member Groups"}));
      }
    } else {
      this.$('.index-banner').addClass("logged-out");
      this.$('.banner-content').html(this.notLoggedInTemplate({
        groups: RendezZoo.groups
      }));
    }

    this.$('#group-index-body').append(this.indexTemplate({groups: this.collection}));
    return this;
  }
});
