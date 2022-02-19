# my-near-experiments

wallet:
testerman-testnet.testnet

Note: In Linux and macOS this folder will be ~/.near-credentials.

```
source neardev/dev-account.env

near call $CONTRACT_NAME new '{"owner_id": "'$CONTRACT_NAME'", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Example Token Name", "symbol": "EXLT", "decimals": 8 }}' --accountId $CONTRACT_NAME
```