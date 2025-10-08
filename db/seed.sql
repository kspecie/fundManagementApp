-- 1. Sample Funds (Use actual UUIDs)
INSERT INTO funds (id, name, vintage_year, target_size_usd, status, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Titanbay Growth Fund I', 2024, 250000000.00, 'Fundraising', NOW()),
('660e8400-e29b-41d4-a716-446655440001', 'Apollo Credit Fund IV', 2023, 750000000.00, 'Investing', NOW());

-- 2. Sample Investors
INSERT INTO investors (id, name, investor_type, email, created_at) VALUES
('770e8400-e29b-41d4-a716-446655440002', 'Goldman Sachs Asset Management', 'Institution', 'investments@gsam.com', NOW()),
('880e8400-e29b-41d4-a716-446655440003', 'CalPERS', 'Institution', 'privateequity@calpers.ca.gov', NOW());

-- 3. Sample Investments (Linking Investors to Funds)
INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
(
    '990e8400-e29b-41d4-a716-446655440004', -- Investment ID
    '770e8400-e29b-41d4-a716-446655440002', -- GSAM
    '550e8400-e29b-41d4-a716-446655440000', -- Titanbay Growth Fund I
    50000000.00,
    '2024-03-15'
),
(
    'aa0e8400-e29b-41d4-a716-446655440005', -- Second Investment ID
    '880e8400-e29b-41d4-a716-446655440003', -- CalPERS
    '660e8400-e29b-41d4-a716-446655440001', -- Apollo Credit Fund IV
    75000000.00,
    '2024-09-22'
);