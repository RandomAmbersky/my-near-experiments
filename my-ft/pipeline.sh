function build () {
  cargo build --manifest-path ./Cargo.toml --target wasm32-unknown-unknown --release
}

function dev_deploy() {
  yarn near dev-deploy --wasmFile ./my-ft/target/wasm32-unknown-unknown/release/my_ft.wasm
}

function deploy() {
  echo "deploy"
  #yarn near deploy --wasmFile ./my-ft/target/wasm32-unknown-unknown/release/my_ft.wasm --accountId ft.randomambersky-test.testnet
}

function empty() {
  echo "command not found: ${1} ${2} ${3}"
}

function main() {

  if [ "$1" == "build" ]; then
    build
  elif [ "$1" == "dev-deploy" ]; then
    dev_deploy
  else
    empty "$1" "$2" "$3"
  fi
}

main "$1" "$2" "$3"
