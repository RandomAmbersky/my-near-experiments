SCRIPT=./pipeline.sh
BENEFICIARY_ID=randomambersky-test.testnet
AMOUNT=20

init: build
#dev-deploy dev-new

build:
	$(SCRIPT) build

dev-deploy:
	$(SCRIPT) dev-deploy

dev-new:
	$(SCRIPT) dev-new

dev-view:
	$(SCRIPT) dev-view

dev-storage-deposit:
	$(SCRIPT) dev-storage-deposit '$(BENEFICIARY_ID)'

dev-balance:
	$(SCRIPT) dev-balance '$(BENEFICIARY_ID)'

dev-transfer:
	$(SCRIPT) dev-transfer '$(BENEFICIARY_ID)' '$(AMOUNT)'

dev-mint:
	$(SCRIPT) dev-mint '$(BENEFICIARY_ID)' '$(AMOUNT)'

dev-delete:
	$(SCRIPT) dev-delete '$(BENEFICIARY_ID)'
