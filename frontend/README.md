# RSS-Reader. 

## Database Setup

CREATE DATABASE rss-express;

CREATE TABLE users (
email VARCHAR(80) UNIQUE NOT NULL,
user_id INT(8) UNIQUE PRIMARY KEY AUTO_INCREMENT
);

Create user and grant privileges.

CREATE TABLE options (
id INT(8) PRIMARY KEY NOT NULL,
columns_displayed INT(2),
max_results_per_column INT(2)
);

CREATE TABLE feeds (
id INT(8) PRIMARY KEY NOT NULL,
feed_url VARCHAR(510),
feed_position_in_dom INT(2)
);

   
