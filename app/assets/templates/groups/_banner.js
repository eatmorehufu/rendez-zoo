<header id="group-banner" class="group">
  I am the group splash banner.
  Group name: <%= group.title %>

  <ul class="group-banner-nav group">
    <li><a href="<%= group_url(group) %>">Home</a></li>
    <li><a href="#">Members</a></li>
    <li><a href="#">Photos</a></li>
  </ul>
  <ul class="group-banner-buttons">
    <% if logged_in? && group.owner_id === current_user.id%>
      <li><%= render "events/create_button", group: group %></li>
    <% end %>
    <li><button class="join-leave-button">Join or Leave</button></li>
  </ul>
</header>
