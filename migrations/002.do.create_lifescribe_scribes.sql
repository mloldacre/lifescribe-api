CREATE TABLE lifescribe_scribes (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id INTEGER REFERENCES lifescribe_users(id) ON DELETE CASCADE NOT NULL
)