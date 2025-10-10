-- =====================
-- SEED DATA (Idempotent)
-- Run multiple times safely - existing records are preserved
-- =====================

-- =====================
-- 1. Sample Funds
-- =====================
INSERT INTO funds (id, name, vintage_year, target_size_usd, status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Titanbay Growth Fund I', 2024, 250000000.64, 'Fundraising')
ON CONFLICT (name) DO NOTHING;

INSERT INTO funds (id, name, vintage_year, target_size_usd, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Apollo Credit Fund IV', 2023, 750000000.00, 'Investing')
ON CONFLICT (name) DO NOTHING;

INSERT INTO funds (id, name, vintage_year, target_size_usd, status) VALUES
('770e8400-e29b-41d4-a716-446655440010', 'Sequoia Capital Fund XVIII', 2022, 500000000.00, 'Closed')
ON CONFLICT (name) DO NOTHING;

INSERT INTO funds (id, name, vintage_year, target_size_usd, status) VALUES
('880e8400-e29b-41d4-a716-446655440011', 'Blackstone Real Estate Partners X', 2024, 1000000000.50, 'Fundraising')
ON CONFLICT (name) DO NOTHING;

INSERT INTO funds (id, name, vintage_year, target_size_usd, status) VALUES
('990e8400-e29b-41d4-a716-446655440012', 'KKR Americas Fund XIII', 2023, 850000000.00, 'Investing')
ON CONFLICT (name) DO NOTHING;

-- =====================
-- 2. Sample Investors
-- =====================
-- Institutions
INSERT INTO investors (id, name, investor_type, email) VALUES
('770e8400-e29b-41d4-a716-446655440002', 'Goldman Sachs Asset Management', 'Institution', 'investments@gsam.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('880e8400-e29b-41d4-a716-446655440003', 'CalPERS', 'Institution', 'privateequity@calpers.ca.gov')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('aa0e8400-e29b-41d4-a716-446655440013', 'Yale Endowment', 'Institution', 'investments@yale.edu')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('bb0e8400-e29b-41d4-a716-446655440014', 'Ontario Teachers Pension Plan', 'Institution', 'pe@otpp.com')
ON CONFLICT (email) DO NOTHING;

-- Family Offices
INSERT INTO investors (id, name, investor_type, email) VALUES
('cc0e8400-e29b-41d4-a716-446655440015', 'Bezos Family Office', 'Family Office', 'investments@bezosfo.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('dd0e8400-e29b-41d4-a716-446655440016', 'Pritzker Group', 'Family Office', 'deals@pritzkergroup.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('ee0e8400-e29b-41d4-a716-446655440017', 'Walton Family Office', 'Family Office', 'pe@waltonfamily.com')
ON CONFLICT (email) DO NOTHING;

-- Individuals
INSERT INTO investors (id, name, investor_type, email) VALUES
('ff0e8400-e29b-41d4-a716-446655440018', 'Sarah Chen', 'Individual', 'sarah.chen@email.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('110e8400-e29b-41d4-a716-446655440019', 'Michael Rodriguez', 'Individual', 'michael.r@email.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO investors (id, name, investor_type, email) VALUES
('220e8400-e29b-41d4-a716-446655440020', 'Jennifer Park', 'Individual', 'jpark@email.com')
ON CONFLICT (email) DO NOTHING;

-- =====================
-- 3. Sample Investments
-- =====================
-- Titanbay Growth Fund I investments
INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('990e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 50000000.00, '2024-03-15')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('330e8400-e29b-41d4-a716-446655440021', 'cc0e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440000', 25000000.00, '2024-04-20')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('440e8400-e29b-41d4-a716-446655440022', 'ff0e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440000', 5000000.00, '2024-05-10')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

-- Apollo Credit Fund IV investments
INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('aa0e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 75000000.00, '2023-09-22')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('550e8400-e29b-41d4-a716-446655440023', 'aa0e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440001', 100000000.00, '2023-10-05')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('660e8400-e29b-41d4-a716-446655440024', 'bb0e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440001', 150000000.00, '2023-11-12')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

-- Sequoia Capital Fund XVIII investments (Closed fund)
INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('770e8400-e29b-41d4-a716-446655440025', '770e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440010', 80000000.00, '2022-06-15')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('880e8400-e29b-41d4-a716-446655440026', 'dd0e8400-e29b-41d4-a716-446655440016', '770e8400-e29b-41d4-a716-446655440010', 35000000.00, '2022-07-20')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('990e8400-e29b-41d4-a716-446655440027', '110e8400-e29b-41d4-a716-446655440019', '770e8400-e29b-41d4-a716-446655440010', 10000000.00, '2022-08-01')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

-- Blackstone Real Estate Partners X investments
INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('aa0e8400-e29b-41d4-a716-446655440028', '880e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440011', 200000000.00, '2024-02-10')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('bb0e8400-e29b-41d4-a716-446655440029', 'bb0e8400-e29b-41d4-a716-446655440014', '880e8400-e29b-41d4-a716-446655440011', 175000000.00, '2024-03-05')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('cc0e8400-e29b-41d4-a716-446655440030', 'ee0e8400-e29b-41d4-a716-446655440017', '880e8400-e29b-41d4-a716-446655440011', 125000000.00, '2024-04-12')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

-- KKR Americas Fund XIII investments
INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('dd0e8400-e29b-41d4-a716-446655440031', 'aa0e8400-e29b-41d4-a716-446655440013', '990e8400-e29b-41d4-a716-446655440012', 120000000.00, '2023-05-18')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('ee0e8400-e29b-41d4-a716-446655440032', 'cc0e8400-e29b-41d4-a716-446655440015', '990e8400-e29b-41d4-a716-446655440012', 50000000.00, '2023-06-25')
ON CONFLICT (investor_id, fund_id) DO NOTHING;

INSERT INTO investments (id, investor_id, fund_id, amount_usd, investment_date) VALUES
('ff0e8400-e29b-41d4-a716-446655440033', '220e8400-e29b-41d4-a716-446655440020', '990e8400-e29b-41d4-a716-446655440012', 15000000.00, '2023-07-14')
ON CONFLICT (investor_id, fund_id) DO NOTHING;