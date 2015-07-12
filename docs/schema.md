# Schema Information

## groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      |
zip_code    | integer   | not null

## group_memberships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
member_id   | integer   | not null, foreign key (references users)
group_id    | integer   | not null, foreign key (references groups)
status      | string    | ["member", "organizer", "owner"]

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
start_time  | datetime  | not null
end_time    | datetime  |
title       | string    | not null
description | string    | not null
group_id    | integer   | not null, foreign key (references groups)
location    | string    |


## event_attendance
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
member_id   | integer   | not null, foreign key (references users)
event_id    | integer   | not null, foreign key (references events)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
username        | string    | not null, unique
avatar_url      | string    | not null

## users_descriptions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
description     | text      |


## categories
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## group-categories
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
group_id        | integer   | not null, foreign key (references groups)
category_id     | integer   | not null, foreign key (references category)

## user-interests
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
category_id     | integer   | not null, foreign key (references category)


## sessions

column name   | data type | details
--------------|-----------|---------------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign_key (references users)
session_token | string    | not null, unique
