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

function token_balance () {
  TOKEN_NAME=$1
  $NEAR view "$TOKEN_NAME" ft_balance_of '{"account_id": "'"$TOKEN_NAME"'"}'
}

function balance () {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  $NEAR view "$TOKEN_NAME" ft_balance_of '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function delete () {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  $NEAR delete "$TOKEN_NAME" "$BENEFICIARY_ID"
}

function main() {
  $1 "$2" "$3" "$4" "$5"
}

main "$1" "$2" "$3" "$4" "$5"
