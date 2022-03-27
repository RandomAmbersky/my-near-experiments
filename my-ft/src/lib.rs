mod ft;

use near_contract_standards::fungible_token::FungibleToken;
use near_contract_standards::fungible_token::metadata::{FT_METADATA_SPEC, FungibleTokenMetadata, FungibleTokenMetadataProvider};

use near_sdk::{near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{PanicOnDefault};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct MyPrettyFungibleToken {
	ft: FungibleToken
}

#[near_bindgen]
impl MyPrettyFungibleToken {
	#[init]
	pub fn new() -> Self {
		Self {
			ft: FungibleToken::new(b"a".to_vec()),
		}
	}
}

#[near_bindgen]
impl FungibleTokenMetadataProvider for MyPrettyFungibleToken {
	fn ft_metadata(&self) -> FungibleTokenMetadata {
		FungibleTokenMetadata {
			spec: FT_METADATA_SPEC.to_string(),
			name: "My Cool Pretty Token".into(),
			symbol: "GOLDO".into(),
			icon: None,
			reference: None,
			reference_hash: None,
			decimals: 6,
		}
	}
}
