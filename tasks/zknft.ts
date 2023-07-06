import { task } from "hardhat/config";
import { ethers } from "ethers";
import { HttpNetworkConfig } from "hardhat/src/types/config";

task("info", "get zknft info")
    .addParam("contract", "Contract address")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function name() public view returns (string memory)`,
                    `function symbol() public view returns (string memory)`
                ]),
                rpc
            )

            console.log(`Name: ${await contract.name()}, Symbol: ${await contract.symbol()}`)
        } catch (error) {
            console.log(error)
        }
    });

task("mint", "mint an NFT")
    .addParam("contract", "Contract address")
    .addParam("recipient", "Recipient address")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)
        const wallet = new ethers.Wallet(`${process.env.DEPLOY_PRIVATE_KEY}`, rpc);

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function mintTo(address to) public`
                ]),
                rpc
            )

            console.log(await contract.connect(wallet).mintTo(taskArgs.recipient));
        } catch (error) {
            console.log(error)
        }
    });


task("balanceof", "get number of tokens from address")
    .addParam("contract", "Contract address")
    .addParam("holder", "Holder address")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function balanceOf(address owner) public view returns (uint256)`
                ]),
                rpc
            )

            console.log(`${await contract.balanceOf(taskArgs.holder)}`)
        } catch (error) {
            console.log(error)
        }
    });

task("tokenuri", "get number of tokens from address")
    .addParam("contract", "Contract address")
    .addParam("tokenid", "NFT id")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function tokenURI(uint256 tokenId) public view returns (string memory)`
                ]),
                rpc
            )

            console.log(`${await contract.tokenURI(taskArgs.tokenid)}`)
        } catch (error) {
            console.log(error)
        }
    });

task("ownerbyindex", "get tokens from address")
    .addParam("contract", "Contract address")
    .addParam("holder", "Holder address")
    .addParam("tokenindex", "NFT index")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)`
                ]),
                rpc
            )

            console.log(`${await contract.tokenOfOwnerByIndex(taskArgs.holder, taskArgs.tokenindex)}`)
        } catch (error) {
            console.log(error)
        }
    });