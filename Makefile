BENEFICIARY_ID=randomambersky-test.testnet
REF_FINANCE_ID=ref-finance-101.testnet
WNEAR_NAME=wrap.testnet

FT_CMD=./my-ft/pipeline.sh
POOL_CMD=./my-banko-defi/pipeline.sh

TOKEN_NAME=$(shell ./utils.sh get_token_name)

# --depositYocto = 1e-24
WNEAR_AMOUNT=10000000000000000000000000
AMOUNT=10000000000000000000000

POOL_ID=460

ft-deploy:
	$(FT_CMD) build
	$(FT_CMD) dev_deploy # testnet only
	mv ./neardev ./my-ft

ft-new:
	$(FT_CMD) new ${TOKEN_NAME}

ft-near-transfer:
#	convert NEAR to wNEAR by beneficiary
	$(FT_CMD) near_deposit ${WNEAR_NAME} ${BENEFICIARY_ID} ${WNEAR_AMOUNT}

# (!) for test purpouse here :)
#ft-near_withdraw:
#	$(FT_CMD) near_withdraw ${WNEAR_NAME} ${BENEFICIARY_ID} ${WNEAR_AMOUNT}

ft-token-transfer:
#	transfer elGOLD token from token to beneficiary
	$(FT_CMD) storage_deposit ${TOKEN_NAME} ${BENEFICIARY_ID}
	$(FT_CMD) token_transfer ${TOKEN_NAME} ${TOKEN_NAME} ${BENEFICIARY_ID} ${AMOUNT}

	#$(FT_CMD) token_transfer ${WNEAR_NAME} ${WNEAR_NAME} ${BENEFICIARY_ID} ${AMOUNT}
	#$(FT_CMD) token_transfer_call ${WNEAR_NAME} ${BENEFICIARY_ID} ${REF_FINANCE_ID} ${WNEAR_AMOUNT}
	#$(FT_CMD) token_transfer_call ${BENEFICIARY_ID} ${TOKEN_NAME} ${REF_FINANCE_ID} ${AMOUNT}

pool-deploy:
	#$(POOL_CMD) add_pool ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${WNEAR_NAME}
	#$(POOL_CMD) storage_deposit ${REF_FINANCE_ID} ${BENEFICIARY_ID} # add some deposit for exchange
	#$(POOL_CMD) register_tokens ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${WNEAR_NAME}
	#$(POOL_CMD) token_deposit_funds ${TOKEN_NAME} ${BENEFICIARY_ID} ${REF_FINANCE_ID} ${AMOUNT}
	$(POOL_CMD) token_deposit_funds ${WNEAR_NAME} ${BENEFICIARY_ID} ${REF_FINANCE_ID} ${WNEAR_AMOUNT}

	#$(POOL_CMD) add_liquidity ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${POOL_ID} ${AMOUNT} ${WNEAR_AMOUNT}

#11480000000000000000000

#pool-clean:
	#$(POOL_CMD) get_funds ${REF_FINANCE_ID} ${BENEFICIARY_ID} ${TOKEN_NAME} ${AMOUNT}

pool-test:
	$(POOL_CMD) test_swap ${REF_FINANCE_ID} ${POOL_ID} ${TOKEN_NAME} ${WNEAR_NAME} 1

balance:
	$(FT_CMD) ft_balance ${TOKEN_NAME} ${TOKEN_NAME} # must be 0 after ft-token-transfer
	$(FT_CMD) ft_balance ${TOKEN_NAME} ${BENEFICIARY_ID} # must be AMOUNT after ft-token-transfer
	#$(FT_CMD) balance ${TOKEN_NAME} ${REF_FINANCE_ID}

	$(FT_CMD) storage_balance ${TOKEN_NAME} ${TOKEN_NAME}
	$(FT_CMD) storage_balance ${TOKEN_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) storage_balance ${TOKEN_NAME} ${REF_FINANCE_ID}

	#$(FT_CMD) balance ${WNEAR_NAME} ${TOKEN_NAME}  #useless
	$(FT_CMD) ft_balance ${WNEAR_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) balance ${WNEAR_NAME} ${REF_FINANCE_ID} #useless

	#$(FT_CMD) storage_balance ${WNEAR_NAME} ${TOKEN_NAME}  # must be null
	$(FT_CMD) storage_balance ${WNEAR_NAME} ${BENEFICIARY_ID}
	#$(FT_CMD) storage_balance ${WNEAR_NAME} ${REF_FINANCE_ID} # must be null

	$(FT_CMD) storage_balance ${REF_FINANCE_ID} ${BENEFICIARY_ID}

	$(POOL_CMD) get_pool ${REF_FINANCE_ID} ${POOL_ID}
	$(POOL_CMD) get_deposits ${REF_FINANCE_ID} ${BENEFICIARY_ID}
	#$(POOL_CMD) get_pool_volumes ${REF_FINANCE_ID} ${POOL_ID}
	#$(POOL_CMD) get_pool_shares ${REF_FINANCE_ID} ${POOL_ID} ${BENEFICIARY_ID}

ft-delete:
	$(FT_CMD) delete ${TOKEN_NAME} ${BENEFICIARY_ID}
	rm -rf ./my-ft/neardev
