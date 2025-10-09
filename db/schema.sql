SET TIME ZONE 'UTC';

-- Make sure the pgcrypto extension exists (needed for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================
-- TABLE: funds
-- =====================
CREATE TABLE IF NOT EXISTS funds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    vintage_year INTEGER NOT NULL CHECK (
        vintage_year > 1900
        AND vintage_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1
    ),
    target_size_usd NUMERIC(15, 2) NOT NULL CHECK (target_size_usd >= 0),
    status VARCHAR(50) NOT NULL CHECK (
        status IN ('Fundraising', 'Investing', 'Closed')
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- =====================
-- TABLE: investors
-- =====================
CREATE TABLE IF NOT EXISTS investors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    investor_type VARCHAR(50) NOT NULL CHECK (
        investor_type IN ('Individual', 'Institution', 'Family Office')
    ),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- =====================
-- TABLE: investments
-- =====================
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fund_id UUID NOT NULL,
    investor_id UUID NOT NULL,
    amount_usd NUMERIC(15, 2) NOT NULL CHECK (amount_usd > 0),
    investment_date DATE NOT NULL CHECK (
        investment_date <= CURRENT_DATE 
        AND investment_date >= '1900-01-01'
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- =====================
-- Foreign Keys (add only if not exists)
-- =====================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'investments_fund_id_fkey'
    ) THEN
        ALTER TABLE investments
        ADD CONSTRAINT investments_fund_id_fkey
        FOREIGN KEY (fund_id) REFERENCES funds(id) ON DELETE RESTRICT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'investments_investor_id_fkey'
    ) THEN
        ALTER TABLE investments
        ADD CONSTRAINT investments_investor_id_fkey
        FOREIGN KEY (investor_id) REFERENCES investors(id) ON DELETE RESTRICT;
    END IF;
END
$$;

-- =====================
-- Unique constraint on (investor_id, fund_id)
-- =====================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'investments_investor_fund_unique'
    ) THEN
        ALTER TABLE investments
        ADD CONSTRAINT investments_investor_fund_unique
        UNIQUE (investor_id, fund_id);
    END IF;
END
$$;

-- =====================
-- Indexes for performance
-- =====================
CREATE INDEX IF NOT EXISTS idx_investments_fund_id ON investments(fund_id);
CREATE INDEX IF NOT EXISTS idx_investments_investor_id ON investments(investor_id);
CREATE INDEX IF NOT EXISTS idx_investors_email ON investors(email);
CREATE INDEX IF NOT EXISTS idx_funds_status ON funds(status);
CREATE INDEX IF NOT EXISTS idx_funds_vintage_year ON funds(vintage_year);