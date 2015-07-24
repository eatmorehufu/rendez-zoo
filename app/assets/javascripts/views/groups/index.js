RendezZoo.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],
  memberTemplate: JST['groups/_member_groups'],
  indexTemplate: JST['groups/_index_groups'],
  notLoggedInTemplate: JST['groups/_splash_banner'],
  loggedInTemplate: JST['groups/_user_welcome'],
  searchTemplate: JST['groups/_search_template'],
  groupListItemTemplate: JST['groups/_group_list_item'],
  tagName: "section",

  events: {
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
        this.attachGroups(RendezZoo.currentUser.organizerGroups(), "Groups you manage");
      }
      if (RendezZoo.currentUser.memberGroups().length > 0) {
        this.attachGroups(RendezZoo.currentUser.memberGroups(), "Groups you belong to");
      }
    } else {
      this.$('.index-banner').addClass("logged-out");
      this.$('.banner-content').html(this.notLoggedInTemplate({
        groups: RendezZoo.groups
      }));
    }
    this.attachSearch();
    this.attachGroups(this.collection, "Suggested Groups");
    return this;
  },

  attachGroups: function(groups, heading) {
    this.$('#group-index-body').append(this.memberTemplate({heading: heading}));
    groups.forEach(function(group){
      var content = this.groupListItemTemplate({ group: group })
      this.$("ul[data-section='" + heading + "']").append(content);
      this.$(".fade-in").removeClass("fade-in");
    }.bind(this))
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
    this.$('#group-index-body').empty()
    this.attachGroups(this.searchResults, "Search Results");
  },
});
