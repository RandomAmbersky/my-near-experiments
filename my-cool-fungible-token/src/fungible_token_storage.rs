use near_contract_standards::storage_management::{StorageBalance, StorageBalanceBounds, StorageManagement};
use near_sdk::json_types::{U128, ValidAccountId};
use near_sdk::{near_bindgen};
use crate::fungible_token::*;

#[near_bindgen]
impl StorageManagement for Contract {
	fn storage_deposit(&mut self, _account_id: Option<ValidAccountId>, _registration_only: Option<bool>) -> StorageBalance {
		todo!()
	}

	fn storage_withdraw(&mut self, _amount: Option<U128>) -> StorageBalance {
		todo!()
	}

	fn storage_unregister(&mut self, _force: Option<bool>) -> bool {
		todo!()
	}

	fn storage_balance_bounds(&self) -> StorageBalanceBounds {
		todo!()
	}

	fn storage_balance_of(&self, _account_id: ValidAccountId) -> Option<StorageBalance> {
		todo!()
	}
}
