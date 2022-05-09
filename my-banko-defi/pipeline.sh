NEAR=$(yarn bin near)

function add_pool() {
  REF_FINANCE_ID=$1
  BENEFICIARY_ID=$2
  TOKEN_NAME=$3
  WNEAR_NAME=$4
  $NEAR call "$REF_FINANCE_ID" --accountId "$BENEFICIARY_ID" add_simple_pool '{"tokens": ["'"$TOKEN_NAME"'", "'"$WNEAR_NAME"'"], "fee": 25}' --amount 0.1
}

function main() {
  $1 "$2" "$3" "$4" "$5"
}

main "$1" "$2" "$3" "$4" "$5"
