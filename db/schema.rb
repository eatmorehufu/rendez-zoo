# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150722131723) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "categories", ["name"], name: "index_categories_on_name", unique: true, using: :btree

  create_table "event_attendances", force: :cascade do |t|
    t.integer  "attendant_id", null: false
    t.integer  "event_id",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "event_attendances", ["attendant_id", "event_id"], name: "index_event_attendances_on_attendant_id_and_event_id", unique: true, using: :btree
  add_index "event_attendances", ["attendant_id"], name: "index_event_attendances_on_attendant_id", using: :btree
  add_index "event_attendances", ["event_id"], name: "index_event_attendances_on_event_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.datetime "start_time",  null: false
    t.datetime "end_time"
    t.string   "title",       null: false
    t.text     "description", null: false
    t.integer  "group_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "street1"
    t.string   "street2"
    t.string   "city"
    t.string   "zip_code"
    t.string   "state"
  end

  add_index "events", ["group_id"], name: "index_events_on_group_id", using: :btree
  add_index "events", ["start_time"], name: "index_events_on_start_time", using: :btree

  create_table "geolocations", force: :cascade do |t|
    t.integer  "locatable_id",   null: false
    t.string   "locatable_type", null: false
    t.float    "lat",            null: false
    t.float    "lng",            null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "geolocations", ["lat"], name: "index_geolocations_on_lat", using: :btree
  add_index "geolocations", ["lng"], name: "index_geolocations_on_lng", using: :btree
  add_index "geolocations", ["locatable_type", "locatable_id"], name: "index_geolocations_on_locatable_type_and_locatable_id", using: :btree

  create_table "group_categories", force: :cascade do |t|
    t.integer  "group_id",    null: false
    t.integer  "category_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "group_categories", ["group_id", "category_id"], name: "index_group_categories_on_group_id_and_category_id", unique: true, using: :btree

  create_table "group_memberships", force: :cascade do |t|
    t.integer  "member_id",                     null: false
    t.integer  "group_id",                      null: false
    t.string   "status",     default: "member", null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "group_memberships", ["group_id"], name: "index_group_memberships_on_group_id", using: :btree
  add_index "group_memberships", ["member_id", "group_id"], name: "index_group_memberships_on_member_id_and_group_id", unique: true, using: :btree
  add_index "group_memberships", ["member_id"], name: "index_group_memberships_on_member_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "title",               null: false
    t.text     "description"
    t.string   "zip_code",            null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "owner_id",            null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "city"
    t.string   "state"
  end

  add_index "groups", ["city"], name: "index_groups_on_city", using: :btree
  add_index "groups", ["owner_id"], name: "index_groups_on_owner_id", using: :btree
  add_index "groups", ["state"], name: "index_groups_on_state", using: :btree
  add_index "groups", ["title"], name: "index_groups_on_title", using: :btree
  add_index "groups", ["zip_code"], name: "index_groups_on_zip_code", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.string   "session_token", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "user_interests", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "category_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "user_interests", ["user_id", "category_id"], name: "index_user_interests_on_user_id_and_category_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.string   "username",            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.text     "description"
    t.string   "zip_code"
    t.string   "city"
    t.string   "state"
  end

  add_index "users", ["city"], name: "index_users_on_city", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["state"], name: "index_users_on_state", using: :btree

end
