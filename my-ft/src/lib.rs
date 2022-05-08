use near_contract_standards::fungible_token::FungibleToken;
use near_contract_standards::fungible_token::metadata::{FT_METADATA_SPEC, FungibleTokenMetadata, FungibleTokenMetadataProvider};

use near_sdk::{env, near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{PanicOnDefault};
use near_sdk::{AccountId, PromiseOrValue};
use near_sdk::json_types::{U128};

const FT_METADATA_NAME: &str = "Eternal Lands Gold Token";
const FT_METADATA_SYMBOL: &str = "elGOLD";

const INITIAL_REF_AMOUNT: u128 = 10000000;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct MyPrettyFungibleToken {
	ft: FungibleToken
}

#[near_bindgen]
impl MyPrettyFungibleToken {
	#[init]
	pub fn new() -> Self {
		let account_id = env::predecessor_account_id();
		let mut this = Self {
			ft: FungibleToken::new(b"a".to_vec())
		};
		this.ft.internal_register_account(&account_id);
		this.ft.internal_deposit(&account_id, INITIAL_REF_AMOUNT.to_owned());
		this
	}
}

near_contract_standards::impl_fungible_token_core!(MyPrettyFungibleToken, ft);
near_contract_standards::impl_fungible_token_storage!(MyPrettyFungibleToken, ft);

#[near_bindgen]
impl FungibleTokenMetadataProvider for MyPrettyFungibleToken {
	fn ft_metadata(&self) -> FungibleTokenMetadata {
		FungibleTokenMetadata {
			spec: FT_METADATA_SPEC.to_owned(),
			name: FT_METADATA_NAME.to_owned(),
			symbol: FT_METADATA_SYMBOL.to_owned(),
			icon: None,
			reference: None,
			reference_hash: None,
			decimals: 18,
		}
	}
}
