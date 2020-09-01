CREATE TABLE lifescribe_users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  PASSWORD TEXT NOT NULL,
  email TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_modified TIMESTAMPTZ
);