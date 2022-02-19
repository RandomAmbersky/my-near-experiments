use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{ PanicOnDefault, near_bindgen};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
	pub num_accounts: u32
}
