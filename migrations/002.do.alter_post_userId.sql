CREATE TYPE post_category AS ENUM ( 
  'Jobs',
  'Apartments',
  'Cars',
  'Other'
);                  

ALTER TABLE posts
  ADD COLUMN
    section post_category;


