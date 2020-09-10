CREATE TABLE lifescribe_scribbles (
  id SERIAL PRIMARY KEY,
  date_created DATE DEFAULT NOW() NOT NULL,
  time_created TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  scribble_type INTEGER NOT NULL,
  scribble_content TEXT NOT NULL,
  scribe_id INTEGER REFERENCES lifescribe_scribes(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES lifescribe_users(id) ON DELETE CASCADE NOT NULL
)