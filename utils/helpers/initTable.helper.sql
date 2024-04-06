CREATE TABLE
    Wallets (
        id SERIAL PRIMARY KEY,
        walletAddress VARCHAR(255) NOT NULL,
        iv VARCHAR(255) NOT NULL,
        encryptedData TEXT NOT NULL,
        phoneNumber VARCHAR(255) NOT NULL
    );