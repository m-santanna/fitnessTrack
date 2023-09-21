CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(255)
)

CREATE TABLE sets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    current_set INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    current_weight INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE RESTRICT,
);