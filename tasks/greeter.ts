import { task } from "hardhat/config";
import { ethers } from "ethers";
import { HttpNetworkConfig } from "hardhat/src/types/config";

task("greet", "get greeting")
    .addParam("contract", "Contract address")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function greet() public view returns (string memory)`
                ]),
                rpc
            )

            console.log(await contract.greet())
        } catch (error) {
            console.log(error)
        }
    });

task("setGreeting", "set greeting")
    .addParam("contract", "Contract address")
    .addParam("greeting", "Greeting content")
    .setAction(async (taskArgs, hre) => {
        const network = (hre.network.config as HttpNetworkConfig);
        const rpc = new ethers.providers.JsonRpcProvider(network.url)
        const wallet = new ethers.Wallet(`${process.env.DEPLOY_PRIVATE_KEY}`, rpc);

        try {
            let contract = new ethers.Contract(
                `${taskArgs.contract}`,
                new ethers.utils.Interface([
                    `function setGreeting(string memory _greeting)`
                ]),
                rpc
            )

            console.log(await contract.connect(wallet).setGreeting(taskArgs.greeting));
        } catch (error) {
            console.log(error)
        }
    });