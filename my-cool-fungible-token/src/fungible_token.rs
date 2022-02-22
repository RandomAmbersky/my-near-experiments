use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{PanicOnDefault, near_bindgen, env, Balance, AccountId, log};
use near_contract_standards::fungible_token::FungibleToken;
use near_contract_standards::fungible_token::metadata::{FT_METADATA_SPEC, FungibleTokenMetadata, FungibleTokenMetadataProvider};
use near_sdk::json_types::{ValidAccountId, U128};
use near_sdk::{PromiseOrValue};
use near_sdk::collections::LazyOption;

const FT_NAME: &str = "My Cool Pretty Token";
const FT_SYMBOL: &str = "MCPT";
const TOTAL_SUPPLY: Balance = 1_000;

near_sdk::setup_alloc!();

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

    fn on_account_closed(&mut self, account_id: AccountId, balance: Balance) {
        log!("Closed @{} with {}", account_id, balance);
    }

    fn on_tokens_burned(&mut self, account_id: AccountId, amount: Balance) {
        log!("Account @{} burned {}", account_id, amount);
    }
}

near_contract_standards::impl_fungible_token_core!(Contract, token, on_tokens_burned);
near_contract_standards::impl_fungible_token_storage!(Contract, token, on_account_closed);

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        self.metadata.get().unwrap()
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use near_sdk::json_types::ValidAccountId;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{Balance, MockedBlockchain, testing_env};
    use crate::fungible_token::Contract;

    fn get_context(predecessor_account_id: ValidAccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    // const TOTAL_SUPPLY: Balance = 1_000_000_000_000_000;
    #[test]
    #[should_panic(expected = "The contract is not initialized")]
    fn test_default() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let _contract = Contract::default();
    }

    #[test]
    fn test_new() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        testing_env!(context.is_view(true).build());
        let contract = Contract::new();
        assert_eq!(contract.ft_metadata().0, TOTAL_SUPPLY);
        // assert_eq!(contract.ft_balance_of(accounts(1)).0, TOTAL_SUPPLY);
    }

}
