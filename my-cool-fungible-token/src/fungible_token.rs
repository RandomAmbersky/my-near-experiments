use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{PanicOnDefault, near_bindgen, env, Balance, log, AccountId, PromiseOrValue};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::json_types::{ValidAccountId, U128};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    token: FungibleToken
}

#[near_bindgen]
impl Contract {
	#[init]
	pub fn new() -> Self {
        assert!(!env::state_exists(), "Already initialized");
        let token = FungibleToken::new(b"a".to_vec());
        Self {
            token
		}
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

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;

    use near_contract_standards::fungible_token::core::FungibleTokenCore;
    use near_contract_standards::storage_management::StorageManagement;
    use near_sdk::json_types::{U128, ValidAccountId};
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{MockedBlockchain, testing_env};
    use crate::fungible_token::Contract;

    const ALICE_ACCOUNT_ID:usize = 0;
    const BOB_ACCOUNT_ID:usize = 1;

    fn get_context(predecessor_account_id: ValidAccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(ALICE_ACCOUNT_ID))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    #[should_panic(expected = "The contract is not initialized")]
    fn test_default() {
        let context = get_context(accounts(ALICE_ACCOUNT_ID));
        testing_env!(context.build());
        let _contract = Contract::default();
    }

    #[test]
    fn test_new() {
        let mut context = get_context(accounts(ALICE_ACCOUNT_ID));
        testing_env!(context.build());
        let contract = Contract::new();
        testing_env!(context.is_view(true).build());
        assert_eq!(contract.ft_total_supply(), 0.into());
        let balance_bounds = contract.storage_balance_bounds();
        let expected_min:U128 = 1_250_000_000_000_000_000_000.into();
        let expected_max:U128 = 1_250_000_000_000_000_000_000.into();
        assert_eq!(balance_bounds.min, expected_min);
        assert_eq!(balance_bounds.max, Some(expected_max));
    }

    #[test]
    fn test_transfer() {
        let mut context = get_context(accounts(ALICE_ACCOUNT_ID));
        testing_env!(context.build());
        let mut contract = Contract::new();

        contract.token.internal_register_account(accounts(ALICE_ACCOUNT_ID).as_ref());
        contract.token.internal_register_account(accounts(BOB_ACCOUNT_ID).as_ref());

        contract.token.internal_deposit(accounts(ALICE_ACCOUNT_ID).as_ref(), 1000);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(1)
            .predecessor_account_id(accounts(ALICE_ACCOUNT_ID))
            .build());
        contract.ft_transfer(accounts(BOB_ACCOUNT_ID), 1000.into(), None);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build());
        let balance_1 = contract.ft_balance_of(accounts(ALICE_ACCOUNT_ID));
        let balance_2 = contract.ft_balance_of(accounts(BOB_ACCOUNT_ID));
        assert_eq!(balance_1, 0.into());
        assert_eq!(balance_2, 1000.into());
    }

    // try https://nomicon.io/Standards/StorageManagement#1-account-pays-own-registration-fee processing
    #[test]
    fn test_register_account () {

        let mut context = get_context(accounts(ALICE_ACCOUNT_ID));
        testing_env!(context.build());
        let mut contract = Contract::new();
        let storage_balance_option = contract.storage_balance_of(accounts(ALICE_ACCOUNT_ID));
        assert_eq!(storage_balance_option.is_none(), true);

        let storage_balance_bounds = contract.storage_balance_bounds();
        let balance_bounds_min = storage_balance_bounds.min.0;
        let balance_bounds_max = storage_balance_bounds.max.unwrap().0;
        assert_eq!(balance_bounds_min, balance_bounds_max);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(balance_bounds_min)
            .predecessor_account_id(accounts(ALICE_ACCOUNT_ID))
            .build());

        let storage_deposit = contract.storage_deposit(accounts(ALICE_ACCOUNT_ID).into(), None);
        assert_eq!(storage_deposit.available.0, 0);
        assert_eq!(storage_deposit.total.0, balance_bounds_min);
    }

    // try https://nomicon.io/Standards/StorageManagement#2-account-pays-for-another-accounts-storage processing
    #[test]
    fn test_another_account () {
        let mut context = get_context(accounts(ALICE_ACCOUNT_ID));
        testing_env!(context.build());
        let mut contract = Contract::new();

        let balance_bounds_min = contract.storage_balance_bounds().min.0;

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(balance_bounds_min)
            .predecessor_account_id(accounts(ALICE_ACCOUNT_ID))
            .build());

        let storage_deposit = contract.storage_deposit(accounts(BOB_ACCOUNT_ID).into(), None);
        assert_eq!(storage_deposit.available.0, 0);
        assert_eq!(storage_deposit.total.0, balance_bounds_min);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(balance_bounds_min)
            .predecessor_account_id(accounts(ALICE_ACCOUNT_ID))
            .build());

        let storage_deposit2 = contract.storage_deposit(accounts(BOB_ACCOUNT_ID).into(), None);
        assert_eq!(storage_deposit2.available.0, 0);
        assert_eq!(storage_deposit2.total.0, balance_bounds_min);

    }
}
