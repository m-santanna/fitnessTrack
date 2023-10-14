CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    timestamp DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(255)
);

CREATE TABLE sets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    current_set INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    current_weight NUMERIC(5,2) NOT NULL,
    timestamp DATE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE RESTRICT
);

CREATE TABLE egroups (
id SERIAL PRIMARY KEY,
group_name VARCHAR(255) NOT NULL,
user_id INTEGER NOT NULL,
exercises_id INTEGER[] NOT NULL,
is_public BOOLEAN NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);