# zkSync NFT

`yarn test`

## Greeting Smart Contract

### Testing

First run local node ([more](https://era.zksync.io/docs/tools/hardhat/testing.html)):

```
cd local-setup
./start.sh
```

Then

```
yarn test
```

### Deployment

#### Localhost

Remember to properly set the values of:

- `DEPLOY_ACCOUNT`
- `DEPLOY_PRIVATE_KEY`

in `.env` file. [More info](https://github.com/matter-labs/local-setup/blob/main/rich-wallets.json).

```
yarn deploy:greeter:localhost
```

This made a new directory - `deployments/localhost` where you can find you CONTRACT_ADDRESS

```
yarn hardhat --network localhost greet --contract CONTRACT_ADDRESS
yarn hardhat --network localhost setGreeting --contract CONTRACT_ADDRESS --greeting "The world is mine"
```

#### zkSync Testnet

Remember to properly set the values of:

- `DEPLOY_ACCOUNT`
- `DEPLOY_PRIVATE_KEY`

in `.env` file.

```
yarn deploy:greeter:testnet
```

This made a new directory - `deployments/zkSyncTestnet` where you can find you CONTRACT_ADDRESS

```
yarn hardhat --network zkSyncTestnet greet --contract CONTRACT_ADDRESS
yarn hardhat --network zkSyncTestnet setGreeting --contract CONTRACT_ADDRESS --greeting "The world is mine"
```

Verify

```
yarn hardhat --network zkSyncTestnet vrf --contract CONTRACT_ADDRESS --name CONTRACT_NAME --args CONSTRUCTOR_ARGS
```