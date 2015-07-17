RendezZoo.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],
  memberTemplate: JST['groups/_member_groups'],
  indexTemplate: JST['groups/_index_groups'],
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
      if (RendezZoo.currentUser.organizerGroups().length > 0) {
        this.$el.append(this.memberTemplate({groups: RendezZoo.currentUser.organizerGroups(), heading: "Your Admin Groups"}));
      }
      if (RendezZoo.currentUser.memberGroups().length > 0) {
        this.$el.append(this.memberTemplate({groups: RendezZoo.currentUser.memberGroups(), heading: "Your Member Groups"}));
      }
    }

    this.$el.append(this.indexTemplate({groups: this.collection}));
    return this;
  }
})
