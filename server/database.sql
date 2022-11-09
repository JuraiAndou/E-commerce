CREATE DATABASE "e-commerce";

CREATE TABLE "users"(
    user_id SERIAL PRIMARY KEY,--this can be changed to a uuid via extentions
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert users
INSERT INTO "users"(user_name, user_email, user_password)
    VALUES (
        'Samuel',
        'samuel@mail.com',
        '123123'
    );