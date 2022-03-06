use near_contract_standards::fungible_token::metadata::{
	FT_METADATA_SPEC, FungibleTokenMetadata, FungibleTokenMetadataProvider
};
use near_sdk::near_bindgen;
use crate::fungible_token::*;

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
	fn ft_metadata(&self) -> FungibleTokenMetadata {
		FungibleTokenMetadata {
			spec: FT_METADATA_SPEC.to_string(),
			name: "My Cool Pretty Token".to_string(),
			symbol: "COOL".to_string(),
			icon: None,
			reference: None,
			reference_hash: None,
			decimals: 24
		}
	}
}

