BEGIN;

INSERT INTO users (user_name, full_name, email, password)
VALUES
  ('user', 'User Name', 'user@example.com', '$2a$12$cVeeKwB/tGVpOocvvpojDOvT8TN.H8TN7l3AB.XgHXz24zsBXOIOy'),
  ('john', 'John Doe', 'johndoe@aol.com', '$2a$12$VnPdsR07nV5lQ0rxZkd31OGE9EDJPQgMqHgR3nI9DuLLu3iDd8uaq');

INSERT INTO posts (title, content, section)
VALUES
  ('Full Stack Web Developer', 'We are looking for a full stack web developer who has 1+ years of 
  job experience in ReactJS, PostgreSQL, Express and NodeJS. Contact us at https://www.thinkful.com', 'Jobs'),
  ('Front End Engineer', 'Uber HQ is hiring for Front End Developer role who has at least 6 months of
  experience in ReactJS and NodeJS. Contact us at 415-555-5555 for more detail', 'Jobs'),
  ('1 bedroom apartment in Marina district', '1-bed-apt in Marina dis. available Apr 1st, Call 415-999-9999', 'Apartments'),
  ('A studio in Financial District', 'A studio available on Apr 5 in FiDi, email: someone@example.com', 'Apartments'),
  ('2020 BMW m3 $40k', '2020 bmw m3 for sale in SF. $40k final. For details call me at 415-333-3333', 'Cars'),
  ('2016 Toyota Camry $30k', '2016 Toyota Camry Hybrid for sale in Oakland. Price: $20,600. For details text me at 415-333-3333', 'Cars'),
  ('free TV', 'Free samsung smart tv 55 - 4k tv. Call 415-333-3333, if interested', 'Other'),
  ('One master bedroom for rent', 'Master bedroom available in Outer Richmond on May 1st. $1000 deposit plus first
and last month, total: $2,600', 'Other');

COMMIT;
