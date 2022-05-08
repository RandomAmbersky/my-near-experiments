NEAR=$(yarn bin near)

CUR_DIR="$(dirname "$0")"

function do_import_env() {
  ENV_FILE_PATH="$CUR_DIR/neardev/dev-account.env"

  if [ -f "$ENV_FILE_PATH" ]; then
    source "${ENV_FILE_PATH}"
  fi

  # token name
  TOKEN_ID="$CONTRACT_NAME"
  echo "$TOKEN_ID"
}


function build () {
  cargo build --manifest-path "$CUR_DIR/Cargo.toml" --target wasm32-unknown-unknown --release
}

function dev_deploy() {
  $NEAR dev-deploy --wasmFile "$CUR_DIR/target/wasm32-unknown-unknown/release/my_ft.wasm"
}

function new() {
  echo "$TOKEN_ID"
  $NEAR call "$TOKEN_ID" new --accountId "$TOKEN_ID"
}

function dev_view () {
    yarn near view "$TOKEN_ID" ft_metadata
}

function dev_storage_deposit () {
  BENEFICIARY_ID=$1
  echo "$BENEFICIARY_ID"
  do_import_env
  $NEAR call "$TOKEN_ID" storage_deposit '' --accountId "$BENEFICIARY_ID" --amount 0.00125
}

function balance () {
  TOKEN_ID=$1
  BENEFICIARY_ID=$2
  echo "$BENEFICIARY_ID"
  $NEAR view "$TOKEN_ID" ft_balance_of '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function dev_transfer () {
  BENEFICIARY_ID=$1
  AMOUNT=$2
  echo "$BENEFICIARY_ID -> $AMOUNT"
  $NEAR call "$TOKEN_ID" ft_transfer --accountId "$TOKEN_ID" '{"receiver_id": "'"$BENEFICIARY_ID"'", "amount": "'"$AMOUNT"'"}' --depositYocto=1
}

function dev_mint () {
  BENEFICIARY_ID=$1
  AMOUNT=$2
  echo "$BENEFICIARY_ID -> $AMOUNT"
  $NEAR call "$TOKEN_ID" ft_mint --accountId "$BENEFICIARY_ID" '{"receiver_id": "'"$BENEFICIARY_ID"'", "amount": "'"$AMOUNT"'"}' --depositYocto=1
}

function delete () {
  TOKEN_ID=$1
  BENEFICIARY_ID=$2
  $NEAR delete "$TOKEN_ID" "$BENEFICIARY_ID"
}

#function get_owner() {
#  do_import_env
#  $NEAR view "$TOKEN_ID" get_owner
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
  elif [ "$1" == "new" ]; then
    new
  elif [ "$1" == "dev-view" ]; then
    dev_view
  elif [ "$1" == "dev-storage-deposit" ]; then
    dev_storage_deposit "$2"
  elif [ "$1" == "balance" ]; then
    balance "$TOKEN_ID" "$2"
  elif [ "$1" == "dev-transfer" ]; then
    dev_transfer "$2" "$3"
  elif [ "$1" == "delete" ]; then
    delete "$TOKEN_ID" "$2"
  elif [ "$1" == "dev-mint" ]; then
    dev_mint "$2" "$3"
  else
    empty "$1" "$2" "$3"
  fi
}

main "$1" "$2" "$3"
