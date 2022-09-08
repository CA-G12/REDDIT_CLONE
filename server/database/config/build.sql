BEGIN ;

DROP TABLE IF EXISTS users , posts , votes CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(200) NOT NULL ,
    email VARCHAR(200) NOT NULL UNIQUE ,
    country VARCHAR(225) DEFAULT 'UNKNOWN' ,
    password TEXT NOT NULL , 
    image TEXT DEFAULT 'https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2'
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY ,
    content TEXT NOT NULL , 
    image TEXT DEFAULT NULL,
    user_id INT ,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE votes (
    post_id INT ,
    user_id INT ,
    vote BOOLEAN DEFAULT NULL ,
    CONSTRAINT userlikepost PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


COMMIT;


