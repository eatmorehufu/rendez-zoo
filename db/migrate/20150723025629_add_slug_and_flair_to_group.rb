class AddSlugAndFlairToGroup < ActiveRecord::Migration
  def change
    add_column :groups, :slug, :string, index: true
    add_column :groups, :flair, :string, index: true
  end
end
