export interface Fund {
    id: string;
    name: string;
    vintage_year: number;
    target_size_usd: number;
    status: 'Fundraising' | 'Investing' | 'Closed';
    created_at: string;
  }
  
export interface FundInput {
name: string;
vintage_year: number;
target_size_usd: number;
status: 'Fundraising' | 'Investing' | 'Closed';
}

export interface Investor {
id: string;
name: string;
investor_type: 'Individual' | 'Institution' | 'Family Office';
email: string;
created_at: string;
}

export interface InvestorInput {
name: string;
investor_type: 'Individual' | 'Institution' | 'Family Office';
email: string;
}

export interface Investment {
id: string;
investor_id: string;
fund_id: string;
amount_usd: number;
investment_date: string;
}

export interface InvestmentInput {
investor_id: string;
amount_usd: number;
investment_date: string;
}