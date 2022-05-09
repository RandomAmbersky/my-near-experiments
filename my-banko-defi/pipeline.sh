NEAR=$(yarn bin near)

function add_pool() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  TOKEN_NAME=$3
  WNEAR_NAME=$4
  $NEAR call "$REF_FINANCE_ID" --accountId "$BENEFICIARY_ID" add_simple_pool '{"tokens": ["'"$TOKEN_NAME"'", "'"$WNEAR_NAME"'"], "fee": 25}' --amount 0.1
}

function get_pool() {
  REF_FINANCE_ID=$1
  POOL_ID=$2
  $NEAR view "$REF_FINANCE_ID" get_pool '{"pool_id": '"${POOL_ID}"'}'
}

function storage_deposit() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  $NEAR call "$REF_FINANCE_ID" --accountId "$BENEFICIARY_ID" storage_deposit '' --depositYocto=1
}

function register_tokens() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  TOKEN_NAME=$3
  $NEAR call "$REF_FINANCE_ID" --accountId "$BENEFICIARY_ID" register_tokens '{"token_ids": ["'"$TOKEN_NAME"'"]}' --depositYocto=1
}

function storage_balance_of() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  $NEAR view "$REF_FINANCE_ID" storage_balance_of '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function token_deposit_funds() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  TOKEN_NAME=$3
  AMOUNT=$4
  $NEAR call "$TOKEN_NAME" storage_deposit  --accountId "$BENEFICIARY_ID" '{"account_id": "'"$REF_FINANCE_ID"'"}' --amount 0.0125
  $NEAR call "$TOKEN_NAME" ft_transfer_call --accountId "$BENEFICIARY_ID" '{"receiver_id": "'"$REF_FINANCE_ID"'", "amount": "'"$AMOUNT"'", "msg": ""}' --gas=100000000000000 --depositYocto=1
}

function main() {
  $1 "$2" "$3" "$4" "$5"
}

main "$1" "$2" "$3" "$4" "$5"
