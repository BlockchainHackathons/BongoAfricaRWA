CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        walletAddress VARCHAR(255) NOT NULL UNIQUE,
        iv VARCHAR(255) NOT NULL,
        encryptedData TEXT NOT NULL,
        phoneNumber VARCHAR(255) NOT NULL UNIQUE
    );