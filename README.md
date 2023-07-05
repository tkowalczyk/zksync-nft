# zkSync NFT

Before testing:

First run local node ([more](https://era.zksync.io/docs/tools/hardhat/testing.html)):

```
cd local-setup
./start.sh
```

## Greeting Smart Contract

***

### Testing

```
yarn test
```

***

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

## NFT Smart Contract

### Deployment

#### Localhost

```
yarn deploy:zknft:localhost
```

This made a new directory - `deployments/localhost` where you can find you CONTRACT_ADDRESS

```
yarn hardhat --network localhost info --contract CONTRACT_ADDRESS
yarn hardhat --network localhost mint --contract CONTRACT_ADDRESS --amount 1
yarn hardhat --network localhost balanceof --contract 0x6E6bc3D438d0f4Fb61c2141c97F008507E7bb183 --holder 0xE90E12261CCb0F3F7976Ae611A29e84a6A85f424
yarn hardhat --network localhost tokenuri --contract 0x6E6bc3D438d0f4Fb61c2141c97F008507E7bb183 --tokenid 1
```