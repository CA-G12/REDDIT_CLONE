BEGIN ;

DROP TABLE IF EXISTS users , posts CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(200) NOT NULL ,
    email VARCHAR(200) NOT NULL UNIQUE ,
    country VARCHAR(225) ,
    password TEXT NOT NULL , 
    image TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY ,
    content TEXT NOT NULL , 
    image TEXT ,
    user_id INT ,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



COMMIT;


