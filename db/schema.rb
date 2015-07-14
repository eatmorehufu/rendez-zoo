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

ActiveRecord::Schema.define(version: 20150714181509) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_addresses", force: :cascade do |t|
    t.integer  "event_id",   null: false
    t.string   "street1"
    t.string   "street2"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "event_addresses", ["city"], name: "index_event_addresses_on_city", using: :btree
  add_index "event_addresses", ["event_id"], name: "index_event_addresses_on_event_id", using: :btree
  add_index "event_addresses", ["state"], name: "index_event_addresses_on_state", using: :btree
  add_index "event_addresses", ["street1"], name: "index_event_addresses_on_street1", using: :btree
  add_index "event_addresses", ["zip_code"], name: "index_event_addresses_on_zip_code", using: :btree

  create_table "events", force: :cascade do |t|
    t.datetime "start_time",  null: false
    t.datetime "end_time"
    t.string   "title",       null: false
    t.text     "description", null: false
    t.integer  "group_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "events", ["group_id"], name: "index_events_on_group_id", using: :btree
  add_index "events", ["start_time"], name: "index_events_on_start_time", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.string   "zip_code",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

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

  create_table "user_details", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.text     "description"
    t.string   "zip_code"
    t.string   "avatar_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_details", ["user_id"], name: "index_user_details_on_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "username",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
