# простой сценарий
# компилируем контракт
# деплоим контракт с хозяином id контракта
# инициализируем конракт

BENEFICIARY_ID=randomambersky-test.testnet
FT_CMD=./my-ft/pipeline.sh

ft-deploy:
	$(FT_CMD) build
	$(FT_CMD) dev-deploy # testnet only
	mv ./neardev ./my-ft
	$(FT_CMD) new

balance:
	$(FT_CMD) token_balance
	$(FT_CMD) balance '$(BENEFICIARY_ID)'

ft-delete:
	$(FT_CMD) delete '$(BENEFICIARY_ID)'
	rm -rf ./my-ft/neardev
