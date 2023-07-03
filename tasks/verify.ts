import { task } from "hardhat/config";
import { Wallet, utils } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

task("vrf", "set greeting")
    .addParam("contract", "Contract address")
    .addParam("name", "Contract name")
    .addParam("args", "Constructor arguments")
    .setAction(async (taskArgs, hre) => {

        try {
            // Initialize the wallet.
            const wallet = new Wallet(`${process.env.DEPLOY_PRIVATE_KEY}`);

            // Create deployer object and load the artifact of the contract you want to deploy.
            const deployer = new Deployer(hre, wallet);
            const artifact = await deployer.loadArtifact(`${taskArgs.name}`);

            // Verify contract programmatically 
            //
            // Contract MUST be fully qualified name (e.g. path/sourceName:contractName)
            const contractFullyQualifedName = `contracts/${taskArgs.name}.sol:${taskArgs.name}`;
            const verificationId = await hre.run("verify:verify", {
                address: `${taskArgs.contract}`,
                contract: `${contractFullyQualifedName}`,
                constructorArguments: [`${taskArgs.args}`],
                bytecode: artifact.bytecode,
            });
            console.log(`${contractFullyQualifedName} deployed at ${`${taskArgs.contract}`} verified! VerificationId: ${verificationId}`)

        } catch (error) {
            console.log(error)
        }
    });