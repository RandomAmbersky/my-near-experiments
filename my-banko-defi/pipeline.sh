source ../neardev/dev-account.env

TOKEN_ID="$CONTRACT_NAME"
DEFI_ID="v1.bank-elgoldo.testnet"

WNEAR="wnear.testnet"

WNEAR_AMOUNT=10000000000000000000000000
AMOUNT=10000000000000000000000

REF_FINANCE_ID="ref-finance.testnet"

#near deploy $ACCOUNT_ID res/dacha.wasm new '{}' --initGas=200000000000000
function deploy_defi() {
    yarn near deploy "$DEFI_ID" res/dacha.wasm new '{}' --initGas=200000000000000
}

#near call $WNEAR --accountId=$ACCOUNT_ID ft_transfer_call '{"receiver_id": "'$CONTRACT_ID'", "amount": "'$WNEAR_AMOUNT'", "msg": ""}' --gas=100000000000000 --depositYocto=1
function transfer_wnear() {
    yarn near call "$WNEAR" --accountId="$TOKEN_ID" ft_transfer_call '{"receiver_id": "'$REF_FINANCE_ID'", "amount": "'$WNEAR_AMOUNT'", "msg": ""}' --gas=100000000000000 --depositYocto=1
}

#near call $CONTRACT_ID add_simple_pool '{"tokens": ["'$ACCOUNT_ID'", "'$WNEAR'"], "fee": 25}' --account_id=$ACCOUNT_ID --amount=0.01
function add_pool() {
    yarn near call "$REF_FINANCE_ID" add_simple_pool '{"tokens": ["'"$TOKEN_ID"'", "'"$WNEAR_ID"'"], "fee": 25}' --account_id="$TOKEN_ID" --amount=0.01
}

#near call $ACCOUNT_ID --accountId=$ACCOUNT_ID set_pool_id '{"potato_pool_id": '$POOL_ID'}'
function set_pool_id() {
    POOL_ID=$1
    yarn near call "$TOKEN_ID" --accountId="$TOKEN_ID" set_pool_id '{"potato_pool_id": '"$POOL_ID"'}'
}

#near call $CONTRACT_ID add_liquidity --accountId=$ACCOUNT_ID '{"pool_id": '$POOL_ID', "amounts": ["'$AMOUNT'", "'$WNEAR_AMOUNT'"]}'  --amount=0.01
function add_liquidity() {
    POOL_ID=$1
    yarn near call "$REF_FINANCE_ID" add_liquidity --accountId="$TOKEN_ID" '{"pool_id": '"$POOL_ID"', "amounts": ["'"$AMOUNT"'", "'"$WNEAR_AMOUNT"'"]}'  --amount=0.01
}

function empty() {
  echo "command not found: ${1} ${2} ${3}"
}

function main() {
  if [ "$1" == "build" ]; then
    build
  elif [ "$1" == "list" ]; then
    pool_list
  else
    empty "$1" "$2" "$3"
  fi
}

main "$1" "$2" "$3"
