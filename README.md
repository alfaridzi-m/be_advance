ujicoba dengan frontend melalui https://github.com/alfaridzi-m/front-tester


-------format dotenv

DB_HOST=localhost
DB_USER=xxxxx
DB_PASSWORD=xxxxx
DB_NAME=xxxxx
PORT=3000

JWT_SECRET=xxxxx

EMAIL_HOST=xxxxx
EMAIL_PORT=xxxxx
EMAIL_USER=xxxxx
EMAIL_PASS=xxxxx


-------insert tabel dummy data
tabel name user
INSERT INTO `user` 
(`fullname`, `username`, `email`, `password`, `verificationToken`, `isVerified`) 
VALUES
('Andi Wijaya',     'user1',  'user1@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Citra Lestari',   'user2',  'user2@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 0),
('Budi Santoso',    'user3',  'user3@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Rina Sari',       'user4',  'user4@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Eko Prasetyo',    'user5',  'user5@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Dewi Anggraini',  'user6',  'user6@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 0),
('Agus Setiawan',   'user7',  'user7@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Siti Nurhaliza',  'user8',  'user8@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Rudi Hartono',    'user9',  'user9@example.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'c3d4e5f6-a7b8-9012-3456-7890abcdef12', 0),
('Linda Wati',      'user10', 'user10@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Hadi Santoso',    'user11', 'user11@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Maya Sari',       'user12', 'user12@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'd4e5f6a7-b8c9-0123-4567-890abcdef123', 0),
('Bambang Susilo',  'user13', 'user13@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Fitri Handayani', 'user14', 'user14@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Iwan Fals',       'user15', 'user15@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'e5f6a7b8-c9d0-1234-5678-90abcdef1234', 0),
('Yuni Shara',      'user16', 'user16@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Dono Warkop',     'user17', 'user17@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Kasino Warkop',   'user18', 'user18@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'f6a7b8c9-d0e1-2345-6789-0abcdef12345', 0),
('Indro Warkop',    'user19', 'user19@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Eva Arnaz',       'user20', 'user20@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Barry Prima',     'user21', 'user21@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'a7b8c9d0-e1f2-3456-7890-abcdef123456', 0),
('Suzanna Martha',  'user22', 'user22@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1),
('Adi Bing Slamet', 'user23', 'user23@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 1);
