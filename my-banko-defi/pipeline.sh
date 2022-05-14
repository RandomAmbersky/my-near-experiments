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

function get_pool_volumes() {
  REF_FINANCE_ID=$1
  POOL_ID=$2
  $NEAR view "$REF_FINANCE_ID" get_pool_volumes '{"pool_id": '"${POOL_ID}"'}'
}

function get_pool_shares() {
  REF_FINANCE_ID=$1
  POOL_ID=$2
  BENEFICIARY_ID=$3
  $NEAR view "$REF_FINANCE_ID" get_pool_shares '{"pool_id": '"${POOL_ID}"', "account_id": "'"$BENEFICIARY_ID"'"}'
}

function test_swap() {
  REF_FINANCE_ID=$1
  POOL_ID=$2
  TOKEN_IN=$3
  TOKEN_OUT=$4
  AMOUNT=$5
  near view "$REF_FINANCE_ID" get_return '{"pool_id": '"${POOL_ID}"', "token_in": "'"${TOKEN_IN}"'", "amount_in": "'"${AMOUNT}"'", "token_out": "'"${TOKEN_OUT}"'"}'
}

function storage_deposit() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  $NEAR call "$REF_FINANCE_ID" --accountId "$BENEFICIARY_ID" storage_deposit '' --amount 0.0125
}

function register_tokens() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  TOKEN_NAME=$3
  WNEAR_NAME=$4
  $NEAR call "$REF_FINANCE_ID" --accountId "$BENEFICIARY_ID" register_tokens '{"token_ids": ["'"$TOKEN_NAME"'", "'"$WNEAR_NAME"'"]}' --depositYocto=1
}

function storage_balance_of() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  $NEAR view "$REF_FINANCE_ID" storage_balance_of '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function get_deposits() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  $NEAR view "$REF_FINANCE_ID" get_deposits '{"account_id": "'"$BENEFICIARY_ID"'"}'
}

function token_deposit_funds() {
  TOKEN_NAME=$1
  BENEFICIARY_ID=$2
  REF_FINANCE_ID=$3
  AMOUNT=$4
  $NEAR call "$TOKEN_NAME" storage_deposit  --accountId "$BENEFICIARY_ID" '{"account_id": "'"$REF_FINANCE_ID"'"}' --amount 0.0125
  $NEAR call "$TOKEN_NAME" ft_transfer_call --accountId "$BENEFICIARY_ID" '{"receiver_id": "'"$REF_FINANCE_ID"'", "amount": "'"$AMOUNT"'", "msg": ""}' --gas=100000000000000 --depositYocto=1
}

function add_liquidity() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  POOL_ID=$3
  AMOUNT=$4
  WNEAR_AMOUNT=$5
  $NEAR call "$REF_FINANCE_ID" add_liquidity --accountId "$BENEFICIARY_ID" '{"pool_id": '"$POOL_ID"', "amounts": ["'"$AMOUNT"'", "'"$WNEAR_AMOUNT"'"]}' --amount=0.01
}

function get_funds() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  TOKEN_NAME=$3
  AMOUNT=$4
  $NEAR call "$REF_FINANCE_ID" withdraw --accountId "$BENEFICIARY_ID" '{"token_id": "'"$TOKEN_NAME"'", "amount": "'"$AMOUNT"'"}' --depositYocto=1
}

#  near call $CONTRACT_ID unregister_tokens "{\"token_ids\": [\"TOKEN_NAME, WNEAR_NAME \"]}" --accountId $USER_ID --depositYocto=1
#  near view $CONTRACT_ID get_deposits "{\"account_id\": \"$USER_ID\"} - must be empty
#  near call $CONTRACT_ID storage_unregister '' --accountId $USER_ID
#near call wrap.testnet storage_unregister '{ "force": true }' --accountId randomambersky-test.testnet --depositYocto=1

function main() {
  $1 "$2" "$3" "$4" "$5" "$6"
}

main "$1" "$2" "$3" "$4" "$5" "$6"
