RendezZoo.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],
  memberTemplate: JST['groups/_member_groups'],
  indexTemplate: JST['groups/_index_groups'],
  notLoggedInTemplate: JST['groups/_splash_banner'],
  loggedInTemplate: JST['groups/_user_welcome'],
  searchTemplate: JST['groups/_search_template'],
  tagName: "section",

  events: {
    "keyup .query, .location": "search",
    "submit .search-form": "search"
  },

  initialize: function(options) {
    this.$el.addClass("groups-index");
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(RendezZoo.currentUser, 'signIn signOut', this.render);
    this.searchResults = new RendezZoo.Collections.SearchResults();
    this.searchResults.pageNum = 1;
    this.listenTo(this.searchResults, "sync", this.renderSearch);
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
    this.attachSearch();
    this.$('#group-index-body').append(this.memberTemplate({groups: this.collection, heading: "Suggested Groups"}));
    return this;
  },

  attachSearch: function() {
    if (RendezZoo.currentUser.isSignedIn() && RendezZoo.currentUser.get('city') && RendezZoo.currentUser.get('state')){
      var location = RendezZoo.currentUser.escape('city') + ", " + RendezZoo.currentUser.escape('state');
    } else {
      var location = "New York, NY";
    }

    var content = this.searchTemplate({ location: location });
    this.$('#search-box').html(content);
  },

  search: function (event) {
    event.preventDefault();
    if (!this.$(".query").val()) {
      this.render();
      return;
    }
    this.searchResults.pageNum = 1;
    this.searchResults.query = this.$(".query").val();
    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
        location: this.$(".location").val(),
        distance: this.$(".distance").val(),
        type: "Group",
        page: 1
      }
    });
  },

  renderSearch: function () {
    var content = this.memberTemplate({groups: this.searchResults, heading: "Search Results"});
    this.$('#group-index-body').html(content);

    return this;
  },
});
