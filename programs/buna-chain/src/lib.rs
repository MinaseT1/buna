use anchor_lang::prelude::*;

declare_id!("Buna1r9jq5TgBuna5rCHa1n5EXAMPLex9XZjrgUuykEj");

#[program]
pub mod bunachain {
    use super::*;

    pub fn create_lot(
        ctx: Context<CreateLot>,
        lot_id: String,
        variety: String,
        region: String,
        weight: u64,
        harvest_date: i64,
        processing_method: String,
    ) -> Result<()> {
        let lot = &mut ctx.accounts.lot;
        lot.authority = *ctx.accounts.authority.key;
        lot.lot_id = lot_id;
        lot.variety = variety;
        lot.region = region;
        lot.weight = weight;
        lot.harvest_date = harvest_date;
        lot.processing_method = processing_method;
        lot.status = "PENDING".to_string();
        lot.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn update_status(ctx: Context<UpdateLot>, new_status: String) -> Result<()> {
        let lot = &mut ctx.accounts.lot;
        lot.status = new_status;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(lot_id: String)]
pub struct CreateLot<'info> {
    #[account(init, payer = authority, space = 8 + CoffeeLot::MAX_SIZE, seeds = [b"lot", lot_id.as_bytes()], bump)]
    pub lot: Account<'info, CoffeeLot>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateLot<'info> {
    #[account(mut)]
    pub lot: Account<'info, CoffeeLot>,
    pub authority: Signer<'info>,
}

#[account]
pub struct CoffeeLot {
    pub authority: Pubkey,
    pub lot_id: String,
    pub variety: String,
    pub region: String,
    pub weight: u64,
    pub harvest_date: i64,
    pub processing_method: String,
    pub status: String,
    pub timestamp: i64,
}

impl CoffeeLot {
    pub const MAX_SIZE: usize = 
        32 +   // authority pubkey
        4 + 64 +  // lot_id (max 64 chars)
        4 + 64 +  // variety
        4 + 64 +  // region
        8 +       // weight
        8 +       // harvest_date
        4 + 64 +  // processing_method
        4 + 32 +  // status
        8;        // timestamp
}
