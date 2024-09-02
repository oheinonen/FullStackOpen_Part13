CREATE TABLE blogs  (
    id SERIAL PRIMARY KEY,
    author text, 
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0 
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Choco chili', 'chocochili.net', 'Herkullinen arkipasta', 101);

INSERT INTO blogs (author, url, title)
VALUES ('Oskari', 'blogs.com', 'My First Blog');