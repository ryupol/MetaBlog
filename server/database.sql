CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_url TEXT DEFAULT 'https://res.cloudinary.com/dxwmjflhh/image/upload/happy.jpg' NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    tag VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
);

-- Insert Users
INSERT INTO users (name, profile_url, email, password) VALUES
('User One', 'user1@example.com', 'user1@example.com', 'password1'),
('User Two', 'user1@example.com', 'user2@example.com', 'password2'),
('User Three', 'user1@example.com', 'user3@example.com', 'password3'),
('User Four', 'user1@example.com', 'user4@example.com', 'password4'),
('User Five', 'user1@example.com', 'user5@example.com', 'password5');

-- Insert Blogs (2 blogs for each user)
INSERT INTO blogs (title, image_url, tag, content, user_id) VALUES
('Blog Title 1', 'https://example.com/image1.jpg', 'tag1', 'Content of blog 1', 1),
('Blog Title 2', 'https://example.com/image2.jpg', 'tag2', 'Content of blog 2', 1),
('Blog Title 3', 'https://example.com/image3.jpg', 'tag3', 'Content of blog 3', 2),
('Blog Title 4', 'https://example.com/image4.jpg', 'tag4', 'Content of blog 4', 2),
('Blog Title 5', 'https://example.com/image5.jpg', 'tag5', 'Content of blog 5', 3),
('Blog Title 6', 'https://example.com/image6.jpg', 'tag6', 'Content of blog 6', 3),
('Blog Title 7', 'https://example.com/image7.jpg', 'tag7', 'Content of blog 7', 4),
('Blog Title 8', 'https://example.com/image8.jpg', 'tag8', 'Content of blog 8', 4),
('Blog Title 9', 'https://example.com/image9.jpg', 'tag9', 'Content of blog 9', 5),
('Blog Title 10', 'https://example.com/image10.jpg', 'tag10', 'Content of blog 10', 5);