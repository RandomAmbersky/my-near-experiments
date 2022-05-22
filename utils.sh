NEAR=$(yarn bin near)
CUR_DIR="$(dirname "$0")"

function get_token_name() {
  ENV_FILE_PATH="$CUR_DIR/my-ft/neardev/dev-account.env"

  if [ -f "$ENV_FILE_PATH" ]; then
    source "${ENV_FILE_PATH}"
  fi

  echo "$CONTRACT_NAME"
}

function main() {
  $1 "$2" "$3" "$4" "$5"
}

main "$1" "$2" "$3" "$4" "$5"
