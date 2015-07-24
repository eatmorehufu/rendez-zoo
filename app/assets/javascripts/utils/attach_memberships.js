RendezZoo.Mixins.AttachMemberships = {

  attachMemberships: function(groups, domEl) {
    groups.forEach(function(group) {
      this.$(domEl).append(this.usersGroupsListItemTemplate({
        group: group
      }))
    }.bind(this))
  }
  
}
