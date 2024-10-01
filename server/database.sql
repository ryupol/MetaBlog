CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_url TEXT NOT NULL, -- DEFAULT 'https://res.cloudinary.com/dxwmjflhh/image/upload/happy.jpg',
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    tag VARCHAR(255) NOT NULL,
    content TEXT,
    created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
);