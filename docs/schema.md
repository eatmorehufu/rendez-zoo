# Schema Information

## groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      |

## group_memberships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
member_id   | integer   | not null, foreign key (references users)
group_id    | integer   | not null, foreign key (references groups)
status      | string    | ["", "organizer"]

column name | data type | details
------------|-----------|-----------------------

column name | data type | details
------------|-----------|-----------------------

column name | data type | details
------------|-----------|-----------------------

column name | data type | details
------------|-----------|-----------------------

column name | data type | details
------------|-----------|-----------------------

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
username        | string    | not null, unique


## sessions

column name   | data type | details
--------------|-----------|---------------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign_key (references users)
session_token | string    | not null, unique
