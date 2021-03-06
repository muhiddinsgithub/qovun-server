CREATE TABLE posts (
  post_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  content TEXT,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL, 
  user_id INTEGER
        REFERENCES users(user_id) ON DELETE CASCADE NOT NULL
);