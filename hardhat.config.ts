import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
// Plugins
import "hardhat-deploy";
import "hardhat-abi-exporter";
import "@typechain/hardhat";

import "hardhat-gas-reporter";
import "./tasks/index";

// load env file
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.3.13",
    compilerSource: 'binary',
    settings: {
      optimizer: {
        enabled: true,
        mode: "z"
      },
      isSystem: false,
      forceEvmla: false,
    }
  },
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      zksync: true,
    },
    localhost: {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true,
      accounts: [
        // rich wallets from local-node https://github.com/matter-labs/local-setup/blob/main/rich-wallets.json
        "0xbe79721778b48bcc679b78edac0ce48306a8578186ffcb9f2ee455ae6efeace1",
        "0x3eb15da85647edd9a1159a4a13b9e7c56877c4eb33f614546d4db06a51868b1c",
      ]
    },
    zkSyncTestnet:
    {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "https://eth-goerli.g.alchemy.com/v2/Onb5fVBy9MBeph6xXVSlYdUW2BS8RzQK",
      zksync: true,
      accounts: [
        // account PKs loaded from .env file
        `${process.env.DEPLOY_PRIVATE_KEY}`
      ],
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    },
  },
  solidity: {
    version: "0.8.17",
  },
  // PLUGINS CONFIG
  namedAccounts: {
    deployer: process.env.DEPLOY_ACCOUNT || ""
  },
  abiExporter: {
    // more info about this plugin in https://www.npmjs.com/package/hardhat-abi-exporter
    path: "./abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  },
  typechain: {
    // more info about this plugin in https://www.npmjs.com/package/@typechain/hardhat
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
