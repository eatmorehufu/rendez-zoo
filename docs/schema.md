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
status      | string    | ["member", "organizer"]

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
start_time  | datetime  | not null
title       | string    | not null
description | string    | not null
group_id    | integer   | not null, foreign key (references groups)
location    | string    | not null


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
descrption      | text      | 


## sessions

column name   | data type | details
--------------|-----------|---------------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign_key (references users)
session_token | string    | not null, unique
