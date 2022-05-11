NEAR=$(yarn bin near)
CUR_DIR="$(dirname "$0")"

function build () {
  cargo build --manifest-path "$CUR_DIR/Cargo.toml" --target wasm32-unknown-unknown --release
}

function dev_deploy() {
  $NEAR dev-deploy --wasmFile "$CUR_DIR/target/wasm32-unknown-unknown/release/my_ft.wasm"
}

function new() {
  TOKEN_NAME=$1
  $NEAR call "$TOKEN_NAME" new --accountId "$TOKEN_NAME"
}

# https://nomicon.io/Standards/Tokens/FungibleToken/Core
# NEP-141
function ft_balance () {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  $NEAR view "$TOKEN_NAME" ft_balance_of '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function token_transfer_call () {
  TOKEN_NAME=$1
  FROM_NAME=$2
  TO_NAME=$3
  AMOUNT=$4
  MSG=$5
  echo "$FROM_NAME -> [ $TOKEN_NAME $AMOUNT ] -> $TO_NAME"
  $NEAR call "$TOKEN_NAME" ft_transfer_call --accountId "$FROM_NAME" '{"receiver_id": "'"$TO_NAME"'", "amount": "'"$AMOUNT"'", "msg": "'"$MSG"'"}' --gas=100000000000000 --depositYocto=1
}

function token_transfer () {
  TOKEN_NAME=$1
  FROM_NAME=$2
  TO_NAME=$3
  AMOUNT=$4
  echo "$FROM_NAME -> [ $TOKEN_NAME $AMOUNT ] -> $TO_NAME"
  $NEAR call "$TOKEN_NAME" ft_transfer --accountId "$FROM_NAME" '{"receiver_id": "'"$TO_NAME"'", "amount": "'"$AMOUNT"'"}' --depositYocto=1
}

# https://nomicon.io/Standards/StorageManagement
# NEP-145

function storage_balance () {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  $NEAR view "$TOKEN_NAME" storage_balance_of '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function storage_deposit () {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  $NEAR call "$TOKEN_NAME" storage_deposit '' --accountId "$BENEFICIARY_ID" --amount 0.00125
}

function delete () {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  $NEAR delete "$TOKEN_NAME" "$BENEFICIARY_ID"
}

function main() {
  $1 "$2" "$3" "$4" "$5" "$6"
}

main "$1" "$2" "$3" "$4" "$5" "$6"
