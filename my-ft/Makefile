SCRIPT=./pipeline.sh
TEST_ID=randomambersky-test.testnet
TEST_AMOUNT=20

init: build dev-deploy dev-new

build:
	$(SCRIPT) build

dev-deploy:
	$(SCRIPT) dev-deploy

dev-new:
	$(SCRIPT) dev-new

dev-view:
	$(SCRIPT) dev-view

dev-storage-deposit:
	$(SCRIPT) dev-storage-deposit '$(TEST_ID)'

dev-balance:
	$(SCRIPT) dev-balance '$(TEST_ID)'

dev-transfer:
	$(SCRIPT) dev-transfer '$(TEST_ID)' '$(TEST_AMOUNT)'

dev-mint:
	$(SCRIPT) dev-mint '$(TEST_ID)' '$(TEST_AMOUNT)'

dev-delete:
	$(SCRIPT) dev-delete '$(TEST_ID)'
