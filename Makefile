BENEFICIARY_ID=randomambersky-test.testnet
REF_FINANCE_ID=ref-finance-101.testnet
WNEAR_NAME=wrap.testnet

FT_CMD=./my-ft/pipeline.sh
POOL_CMD=./my-banko-defi/pipeline.sh

TOKEN_NAME=$(shell ./utils.sh get_token_name)
WNEAR_AMOUNT=1
AMOUNT=100

POOL_ID=455

ft-deploy:
	$(FT_CMD) build
	$(FT_CMD) dev_deploy # testnet only
	mv ./neardev ./my-ft

ft-new:
	$(FT_CMD) new ${TOKEN_NAME}

ft-transfer:
	#$(FT_CMD) storage_deposit ${TOKEN_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) storage_deposit ${WNEAR_NAME} ${BENEFICIARY_ID}
	$(FT_CMD) token_transfer ${TOKEN_NAME} ${TOKEN_NAME} ${BENEFICIARY_ID} ${AMOUNT}
	#$(FT_CMD) token_transfer_call ${WNEAR_NAME} ${BENEFICIARY_ID} ${REF_FINANCE_ID} ${WNEAR_AMOUNT}
	#$(FT_CMD) token_transfer_call ${BENEFICIARY_ID} ${TOKEN_NAME} ${REF_FINANCE_ID} ${AMOUNT}

pool-deploy:
	#$(POOL_CMD) add_pool ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${WNEAR_NAME}
	#$(POOL_CMD) storage_deposit ${REF_FINANCE_ID} ${BENEFICIARY_ID}
	#$(POOL_CMD) register_tokens ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${WNEAR_NAME}
	$(POOL_CMD) token_deposit_funds ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${AMOUNT}
	$(POOL_CMD) token_deposit_funds ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${WNEAR_NAME} ${WNEAR_AMOUNT}
	$(POOL_CMD) add_liquidity ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${POOL_ID} ${AMOUNT} ${WNEAR_AMOUNT}

pool-clean:
	$(POOL_CMD) get_funds ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${AMOUNT}

pool-test:
	$(POOL_CMD) test_swap ${REF_FINANCE_ID} ${POOL_ID} ${TOKEN_NAME} ${WNEAR_NAME} 1

balance:
	#$(FT_CMD) balance ${TOKEN_NAME} ${TOKEN_NAME}
	#$(FT_CMD) balance ${TOKEN_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) balance ${TOKEN_NAME} ${REF_FINANCE_ID}

	#$(FT_CMD) storage_balance ${TOKEN_NAME} ${TOKEN_NAME}
	$(FT_CMD) storage_balance ${TOKEN_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) storage_balance ${TOKEN_NAME} ${REF_FINANCE_ID}

	#$(FT_CMD) balance ${WNEAR_NAME} ${TOKEN_NAME}  #useless
	$(FT_CMD) ft_balance ${WNEAR_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) balance ${WNEAR_NAME} ${REF_FINANCE_ID} #useless

	#$(FT_CMD) storage_balance ${WNEAR_NAME} ${TOKEN_NAME}  # must be null
	$(FT_CMD) storage_balance ${WNEAR_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) storage_balance ${WNEAR_NAME} ${REF_FINANCE_ID} # must be null

	#$(FT_CMD) storage_balance ${REF_FINANCE_ID} ${BENEFICIARY_ID}

	$(POOL_CMD) get_pool ${REF_FINANCE_ID} ${POOL_ID}
	$(POOL_CMD) get_deposits ${REF_FINANCE_ID} ${BENEFICIARY_ID}
	#$(POOL_CMD) get_pool_volumes ${REF_FINANCE_ID} ${POOL_ID}
	#$(POOL_CMD) get_pool_shares ${REF_FINANCE_ID} ${POOL_ID} ${BENEFICIARY_ID}

ft-delete:
	$(FT_CMD) delete ${TOKEN_NAME} ${BENEFICIARY_ID}
	rm -rf ./my-ft/neardev
