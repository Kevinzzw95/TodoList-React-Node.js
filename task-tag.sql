create table tasks (
  id VARCHAR(500) NOT NULL PRIMARY KEY,
  content VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  is_done BOOL NOT NULL,
  tag_id INTEGER NOT NULL,
  is_important BOOL,
  is_urgent BOOL
);

create table tags (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(50) NOT NULL
);
