SET TIME ZONE 'UTC';

CREATE TABLE funds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(225) UNIQUE NOT NULL,
    vintage_year INTEGER NOT NULL CHECK (vintage_year > 1900 AND vintage_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1),
    target_size_usd NUMERIC (15, 2) NOT NULL CHECK (target_size_usd >= 0), --use NUMERIC for monetary values
    status VARCHAR(50) NOT NULL CHECK (status IN ('Fundraising', 'Investing', 'Closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE investors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    investor_type VARCHAR(50) NOT NULL CHECK (investor_type IN ('Individual', 'Institution', 'Family Office')),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE table investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fund_id UUID NOT NULL REFERENCES funds(id) ON DELETE RESTRICT, --FK to FUNDS table
    investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE RESTRICT, --FK to INVESTORS table
    amount_usd NUMERIC(15, 2) NOT NULL CHECK (amount_usd > 0),
    investment_date DATE NOT NULL,
    UNIQUE (investor_id, fund_id) --Ensures an investor can invest in a fund only once
);
