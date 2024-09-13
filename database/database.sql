-- akun user
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)
INSERT INTO users(name,email,password) VALUES()
-- tabel pengeluaran 
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL ,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date VARCHAR(20) NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
INSERT INTO expenses (user_id, amount, description, expense_date)
VALUES ( 6a44aad3-3fc0-43cf-adbc-dee672b1287c, 100.50, 'Makan siang', '2024-08-01');
