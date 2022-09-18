# RSS-Reader. 

## Frontend Setup

Navigate to /frontend and run `npm install`

## Backend Setup

Navigate to /backend and run `npm install`

## Database Setup

```CREATE DATABASE rss-express;```

Create user, and then grant privileges:

```
GRANT ALL PRIVILEGES ON `rss-express`.* TO 'rss-express-admin'@'localhost' WITH GRANT OPTION;
```

```
CREATE TABLE users (
email VARCHAR(80) UNIQUE NOT NULL,
id INT(8) UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE options (
user_id INT(8) NOT NULL,
id INT(20) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
columns_displayed INT(2) NOT NULL,
max_results_per_column INT(2) NOT NULL
);

CREATE TABLE feeds (
user_id INT(8) NOT NULL,
id INT(20) PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
feed_url VARCHAR(510) NOT NULL,
feed_position_in_dom INT(2) NOT NULL,
);

ALTER TABLE feeds ADD UNIQUE INDEX id_url (user_id, feed_url);
ALTER TABLE feeds ADD UNIQUE INDEX id_position (user_id, feed_position_in_dom);

```

   
