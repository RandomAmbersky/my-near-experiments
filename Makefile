BENEFICIARY_ID=randomambersky-test.testnet
FT_CMD=./my-ft/pipeline.sh

deploy-ft:
	$(FT_CMD) build
	$(FT_CMD) dev-deploy # testnet only
	mv ./neardev ./my-ft
	$(FT_CMD) new

balance:
	$(FT_CMD) balance '$(BENEFICIARY_ID)'

delete-ft:
	$(FT_CMD) delete '$(BENEFICIARY_ID)'
	rm -rf ./my-ft/neardev
