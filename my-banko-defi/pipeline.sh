NEAR=$(yarn bin near)

function do_import_env() {
  source ../my-ft/neardev/dev-account.env
  # token name
  TOKEN_ID="$CONTRACT_NAME"

#   creator user name
  BENEFICIARY_ID="randomambersky-test.testnet"

  # wnear contract name
  WNEAR="wnear.testnet"

  # liquidity pool contract name
  REF_FINANCE_ID="ref-finance.testnet"

  WNEAR_AMOUNT=100
  AMOUNT=100

  POOL_ID=167
}

function add_pool() {
  $NEAR call $REF_FINANCE_ID add_simple_pool '{"tokens": ["'$TOKEN_ID'", "'$WNEAR'"], "fee": 25}' --accountId $BENEFICIARY_ID --amount 0.1
}

#function view_pools() {
#  POOL_ID=167
#  $NEAR view $REF_FINANCE_ID get_pools '{"from_index": '$POOL_ID', "limit": 1}'
#}

function get_pool() {
  $NEAR view $REF_FINANCE_ID get_pool '{"pool_id": '$POOL_ID'}'
}

function storage_deposit() {
  $NEAR call $REF_FINANCE_ID storage_deposit '' --accountId $BENEFICIARY_ID --amount 0.1
}

function register_tokens() {
    $NEAR call $REF_FINANCE_ID register_tokens '{"token_ids": ["'$TOKEN_ID'"]}' --accountId $BENEFICIARY_ID --depositYocto=1
}

function storage_balance_of() {
    $NEAR view $REF_FINANCE_ID storage_balance_of '{"account_id": "'$BENEFICIARY_ID'"}'
}

function get_deposits() {
  $NEAR view $REF_FINANCE_ID get_deposits '{"account_id": "'$BENEFICIARY_ID'"}'
}

function deposit_funds() {
  deposit_funds_part1
  deposit_funds_part2
  deposit_funds_part3
}

function deposit_funds_part1() {
  $NEAR call "$TOKEN_ID" storage_deposit  --accountId $BENEFICIARY_ID '{"account_id": "'$REF_FINANCE_ID'"}' --amount 0.0125
}

function deposit_funds_part2() {
  $NEAR call "$TOKEN_ID" storage_deposit  --accountId $BENEFICIARY_ID '{"account_id": "'$BENEFICIARY_ID'"}' --amount 0.0125
  $NEAR view "$TOKEN_ID" storage_balance_of '{"account_id": "'$BENEFICIARY_ID'"}'
}

function deposit_funds_part3() {
  $NEAR call "$TOKEN_ID" ft_transfer_call --accountId $BENEFICIARY_ID '{"receiver_id": "'$REF_FINANCE_ID'", "amount": "'$AMOUNT'", "msg": ""}' --gas=100000000000000 --depositYocto=1
}

function add_liquidity() {
  $NEAR call $REF_FINANCE_ID add_liquidity --accountId $BENEFICIARY_ID '{"pool_id": '$POOL_ID', "amounts": ["'$AMOUNT'", "'$WNEAR_AMOUNT'"]}' --amount 0.000000000000000000000001
}

#near call $WNEAR --accountId=$ACCOUNT_ID ft_transfer_call '{"receiver_id": "'$CONTRACT_ID'", "amount": "'$WNEAR_AMOUNT'", "msg": ""}' --gas=100000000000000 --depositYocto=1
#function transfer_wnear() {
#  yarn near call "$WNEAR" --accountId="$TOKEN_ID" ft_transfer_call '{"receiver_id": "'$REF_FINANCE_ID'", "amount": "'$WNEAR_AMOUNT'", "msg": ""}' --gas=100000000000000 --depositYocto=1
#}

#near call $CONTRACT_ID add_simple_pool '{"tokens": ["'$ACCOUNT_ID'", "'$WNEAR'"], "fee": 25}' --account_id=$ACCOUNT_ID --amount=0.01
#function add_pool() {
#    yarn near call "$REF_FINANCE_ID" add_simple_pool '{"tokens": ["'"$TOKEN_ID"'", "'"$WNEAR_ID"'"], "fee": 25}' --account_id="$TOKEN_ID" --amount=0.01
#}

#near call $ACCOUNT_ID --accountId=$ACCOUNT_ID set_pool_id '{"potato_pool_id": '$POOL_ID'}'
#function set_pool_id() {
#    POOL_ID=$1
#    yarn near call "$TOKEN_ID" --accountId="$TOKEN_ID" set_pool_id '{"potato_pool_id": '"$POOL_ID"'}'
#}

#near call $CONTRACT_ID add_liquidity --accountId=$ACCOUNT_ID '{"pool_id": '$POOL_ID', "amounts": ["'$AMOUNT'", "'$WNEAR_AMOUNT'"]}'  --amount=0.01
#function add_liquidity() {
#    POOL_ID=$1
#    yarn near call "$REF_FINANCE_ID" add_liquidity --accountId="$TOKEN_ID" '{"pool_id": '"$POOL_ID"', "amounts": ["'"$AMOUNT"'", "'"$WNEAR_AMOUNT"'"]}'  --amount=0.01
#}

#function empty() {
#  echo "command not found: ${1} ${2} ${3}"
#}

function main() {
  do_import_env
  if [ "$1" == "add_pool" ]; then
    add_pool
  elif [ "$1" == "view_pool" ]; then
    view_pool
  elif [ "$1" == "storage_deposit" ]; then
    storage_deposit
  elif [ "$1" == "register_tokens" ]; then
    register_tokens
  elif [ "$1" == "storage_balance_of" ]; then
    storage_balance_of
  elif [ "$1" == "get_pool" ]; then
    get_pool
  elif [ "$1" == "add_liquidity" ]; then
    add_liquidity
  elif [ "$1" == "get_deposits" ]; then
    get_deposits
  elif [ "$1" == "deposit_funds" ]; then
    deposit_funds
  elif [ "$1" == "deposit_funds_part1" ]; then
    deposit_funds_part1
  elif [ "$1" == "deposit_funds_part2" ]; then
    deposit_funds_part2
  elif [ "$1" == "deposit_funds_part3" ]; then
    deposit_funds_part3
  else
    empty "$1" "$2" "$3"
  fi
}

main "$1" "$2" "$3"
