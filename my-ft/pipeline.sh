NEAR=$(yarn bin near)

function build () {
  cargo build --manifest-path ./Cargo.toml --target wasm32-unknown-unknown --release
}

function dev_deploy() {
  $NEAR dev-deploy --wasmFile ./target/wasm32-unknown-unknown/release/my_ft.wasm
}

function dev_new() {
  source ../neardev/dev-account.env
  echo "$CONTRACT_NAME"
  yarn near call "$CONTRACT_NAME" new --accountId "$CONTRACT_NAME"
}

function dev_view () {
    source ../neardev/dev-account.env
    yarn near view "$CONTRACT_NAME" ft_metadata
}

function dev_storage_deposit () {
  ID=$1
  echo "$ID"
  source ../neardev/dev-account.env
  yarn near call "$CONTRACT_NAME" storage_deposit '' --accountId "$ID" --amount 0.00125
}

function dev_balance () {
  ID=$1
  echo "$ID"
  source ../neardev/dev-account.env
  yarn near view "$CONTRACT_NAME" ft_balance_of '{"account_id": "'"$ID"'"}'
}

function dev_transfer () {
  ID=$1
  AMOUNT=$2
  echo "$ID -> $AMOUNT"
  source ../neardev/dev-account.env
  yarn near call "$CONTRACT_NAME" ft_transfer '{"receiver_id": "'"$ID"'", "amount": "'"$AMOUNT"'"}' --accountId "$CONTRACT_NAME" --amount 0.000000000000000000000001
}

function dev_mint () {
  ID=$1
  AMOUNT=$2
  echo "$ID -> $AMOUNT"
  source ../neardev/dev-account.env
  yarn near call "$CONTRACT_NAME" ft_mint '{"receiver_id": "'"$ID"'", "amount": "'"$AMOUNT"'"}' --accountId "$CONTRACT_NAME" --amount 0.000000000000000000000001
}

function dev_delete () {
  BENEFICIARY_ID=$1
  source ./neardev/dev-account.env
  $NEAR delete "$CONTRACT_NAME" "$BENEFICIARY_ID"
}

function get_owner() {
  source ../neardev/dev-account.env
  yarn near view "$CONTRACT_NAME" get_owner
}

function empty() {
  echo "command not found: ${1} ${2} ${3}"
}

function main() {

  if [ "$1" == "build" ]; then
    build
  elif [ "$1" == "get-owner" ]; then
    get_owner
  elif [ "$1" == "dev-deploy" ]; then
    dev_deploy
  elif [ "$1" == "dev-new" ]; then
    dev_new
  elif [ "$1" == "dev-view" ]; then
    dev_view
  elif [ "$1" == "dev-storage-deposit" ]; then
    dev_storage_deposit "$2"
  elif [ "$1" == "dev-balance" ]; then
    dev_balance "$2"
  elif [ "$1" == "dev-transfer" ]; then
    dev_transfer "$2" "$3"
  elif [ "$1" == "dev-delete" ]; then
    dev_delete "$2"
  elif [ "$1" == "dev-mint" ]; then
    dev_mint "$2" "$3"
  else
    empty "$1" "$2" "$3"
  fi
}

main "$1" "$2" "$3"
