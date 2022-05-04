SCRIPT=./pipeline.sh
TEST_ID=randomambersky-test.testnet
TEST_AMOUNT=20

init: build dev-deploy dev-new

build:
	$(SCRIPT) build

dev-deploy:
	$(SCRIPT) dev-deploy

dev-new:
	$(SCRIPT) dev-new

dev-view:
	$(SCRIPT) dev-view

dev-storage-deposit:
	$(SCRIPT) dev-storage-deposit '$(TEST_ID)'

dev-balance:
	$(SCRIPT) dev-balance '$(TEST_ID)'

dev-transfer:
	$(SCRIPT) dev-transfer '$(TEST_ID)' '$(TEST_AMOUNT)'

dev-mint:
	$(SCRIPT) dev-mint '$(TEST_ID)' '$(TEST_AMOUNT)'

dev-delete:
	$(SCRIPT) dev-delete '$(TEST_ID)'

#	near dev-deploy ./my-ft/target/wasm32-unknown-unknown/release/my_ft.wasm

#build:
#	cargo build --manifest-path ./Cargo.toml --target wasm32-unknown-unknown --release
#
#dev-deploy:
#	near dev-deploy ./my-ft/target/wasm32-unknown-unknown/release/my_ft.wasm


#build:
#	cargo build
#
#pipeline: build dev-account-create dev-deploy dev-new
##dev-deposit
#
#delete: dev-account-delete
#
#dev-account-create:
#	yarn near create-account ft.randomambersky-test.testnet --masterAccount randomambersky-test.testnet --initialBalance 20.000000000000000000000001
#
#dev-account-delete:
#	yarn near delete ft.randomambersky-test.testnet randomambersky-test.testnet

#dev-build:
#	cargo build --manifest-path ./Cargo.toml --target wasm32-unknown-unknown --release
#
#dev-deploy:
#	yarn near deploy --wasmFile ./my-ft/target/wasm32-unknown-unknown/release/my_ft.wasm --accountId ft.randomambersky-test.testnet
#
#dev-new:
#	yarn near call ft.randomambersky-test.testnet new --account-id ft.randomambersky-test.testnet
#
#dev-supply:
#	yarn near view ft.randomambersky-test.testnet get_total_supply
#
#dev-balance:
#	yarn near view ft.randomambersky-test.testnet ft_balance_of '{"account_id": "randomambersky-test.testnet"}'
#
#dev-storage-balance:
#	yarn near view ft.randomambersky-test.testnet storage_balance_of '{"account_id": "ft.randomambersky-test.testnet"}'
#
#dev-storage-balance-bounds:
#	yarn near view ft.randomambersky-test.testnet storage_balance_bounds '{"account_id": "ft.randomambersky-test.testnet"}'
#
#dev-meta:
#	yarn near view ft.randomambersky-test.testnet ft_metadata
#
#dev-view-state:
#	yarn near view-state ft.randomambersky-test.testnet --finality final
#
#dev-state:
#	yarn near state ft.randomambersky-test.testnet
#
##dev-storage-deposit:
##	yarn near call ft.randomambersky-test.testnet storage_deposit '{"account_id": "testerman2.testnet"}' --accountId testerman2.testnet --deposit 0.001250000000000000000000
#
#dev-transfer:
#	yarn near call ft.randomambersky-test.testnet ft_transfer '{"receiver_id": "randomambersky-test.testnet", "amount": "1"}' --accountId ft.randomambersky-test.testnet --amount 0.000000000000000000000001
#
#dev-deposit:
#	yarn near call ft.randomambersky-test.testnet near_deposit --account-id randomambersky-test.testnet --deposit 0.0000001
#
#dev-withdraw:
#	yarn near call ft.randomambersky-test.testnet near_withdraw '{"amount": "15000000000000000000000000"}' --account-id randomambersky-test.testnet --deposit 0.000000000000000000000001
