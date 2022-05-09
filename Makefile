BENEFICIARY_ID=randomambersky-test.testnet
REF_FINANCE_ID=ref-finance.testnet
WNEAR_NAME=wnear.testnet

FT_CMD=./my-ft/pipeline.sh
POOL_CMD=./my-banko-defi/pipeline.sh

TOKEN_NAME=$(shell ./utils.sh get_token_name)
WNEAR_AMOUNT=100
AMOUNT=100

POOL_ID=170

ft-deploy:
	$(FT_CMD) build
	$(FT_CMD) dev-deploy # testnet only
	mv ./neardev ./my-ft
	$(FT_CMD) new

pool-deploy:
	#$(POOL_CMD) add_pool ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${WNEAR_NAME}
	#$(POOL_CMD) storage_deposit ${REF_FINANCE_ID} ${BENEFICIARY_ID}
	#$(POOL_CMD) register_tokens ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME}
	$(POOL_CMD) token_deposit_funds ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${AMOUNT}

balance:
	$(FT_CMD) token_balance ${TOKEN_NAME}
	$(FT_CMD) balance ${TOKEN_NAME} ${BENEFICIARY_ID}
	$(POOL_CMD) get_pool ${REF_FINANCE_ID} ${POOL_ID}
	$(POOL_CMD) storage_balance_of ${REF_FINANCE_ID} ${BENEFICIARY_ID}

ft-delete:
	$(FT_CMD) delete ${TOKEN_NAME} ${BENEFICIARY_ID}
	rm -rf ./my-ft/neardev
