NEAR=$(yarn bin near)

function do_import_env() {
    source ./neardev/dev-account.env
}

function build () {
  cargo build --manifest-path ./Cargo.toml --target wasm32-unknown-unknown --release
}

function dev_deploy() {
  $NEAR dev-deploy --wasmFile ./target/wasm32-unknown-unknown/release/my_ft.wasm
}

function dev_new() {
  echo "$CONTRACT_NAME"
  $NEAR call "$CONTRACT_NAME" new --accountId "$CONTRACT_NAME"
}

function dev_view () {
    yarn near view "$CONTRACT_NAME" ft_metadata
}

function dev_storage_deposit () {
  ID=$1
  echo "$ID"
  do_import_env
  $NEAR call "$CONTRACT_NAME" storage_deposit '' --accountId "$ID" --amount 0.00125
}

function dev_balance () {
  ID=$1
  echo "$ID"
  $NEAR view "$CONTRACT_NAME" ft_balance_of '{"account_id": "'"$ID"'"}'
}

function dev_transfer () {
  ID=$1
  AMOUNT=$2
  echo "$ID -> $AMOUNT"
  $NEAR call "$CONTRACT_NAME" ft_transfer '{"receiver_id": "'"$ID"'", "amount": "'"$AMOUNT"'"}' --accountId "$CONTRACT_NAME" --amount 0.000000000000000000000001
}

function dev_mint () {
  ID=$1
  AMOUNT=$2
  echo "$ID -> $AMOUNT"
  $NEAR call "$CONTRACT_NAME" ft_mint '{"receiver_id": "'"$ID"'", "amount": "'"$AMOUNT"'"}' --accountId "$CONTRACT_NAME" --amount 0.000000000000000000000001
}

function dev_delete () {
  BENEFICIARY_ID=$1
  $NEAR delete "$CONTRACT_NAME" "$BENEFICIARY_ID"
}

#function get_owner() {
#  do_import_env
#  $NEAR view "$CONTRACT_NAME" get_owner
#}

function empty() {
  echo "command not found: ${1} ${2} ${3}"
}

function main() {
  do_import_env
  if [ "$1" == "build" ]; then
    build
#  elif [ "$1" == "get-owner" ]; then
#    get_owner
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
