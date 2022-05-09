BENEFICIARY_ID=randomambersky-test.testnet
REF_FINANCE_ID=ref-finance.testnet
WNEAR_NAME=wnear.testnet

FT_CMD=./my-ft/pipeline.sh
POOL_CMD=./my-banko-defi/pipeline.sh

TOKEN_NAME=$(shell ./utils.sh get_token_name)

POOL_ID=170

ft-deploy:
	$(FT_CMD) build
	$(FT_CMD) dev-deploy # testnet only
	mv ./neardev ./my-ft
	$(FT_CMD) new

pool-deploy:
	$(POOL_CMD) add_pool ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${WNEAR_NAME}

balance:
	$(FT_CMD) token_balance
	$(FT_CMD) balance '$(BENEFICIARY_ID)'
	$(POOL_CMD) get_pool ${REF_FINANCE_ID} ${POOL_ID}

ft-delete:
	$(FT_CMD) delete '$(BENEFICIARY_ID)'
	rm -rf ./my-ft/neardev
