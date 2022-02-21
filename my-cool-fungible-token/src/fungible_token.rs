use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{PanicOnDefault, near_bindgen, env, Balance};
use near_contract_standards::fungible_token::FungibleToken;
use near_contract_standards::fungible_token::metadata::{FT_METADATA_SPEC, FungibleTokenMetadata, FungibleTokenMetadataProvider};
use near_sdk::collections::LazyOption;
use near_sdk::json_types::U128;

const FT_NAME: &str = "My Cool Pretty Token";
const FT_SYMBOL: &str = "MCPT";
const TOTAL_SUPPLY: Balance = 1_000;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    token: FungibleToken,
    metadata: LazyOption<FungibleTokenMetadata>,
}

#[near_bindgen]
impl Contract {
	#[init]
	pub fn new() -> Self {
        let owner_id = env::current_account_id();
        let total_supply: U128 = TOTAL_SUPPLY.into();
        let token = FungibleToken::new(b"a".to_vec());
        let meta = FungibleTokenMetadata {
            spec: FT_METADATA_SPEC.to_string(),
            name: FT_NAME.to_string(),
            symbol: FT_SYMBOL.to_string(),
            icon: None,
            reference: None,
            reference_hash: None,
            decimals: 0
        };
        let metadata = LazyOption::new(b"m".to_vec(), Some(&meta));
        let mut this = Self {
            token,
            metadata
		};
        this.token.internal_register_account(&owner_id);
        this.token.internal_deposit(&owner_id, total_supply.into());
        this
	}
}

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        self.metadata.get().unwrap()
    }
}
