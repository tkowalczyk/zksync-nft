import { expect } from 'chai';
import { Wallet, Provider, Contract } from 'zksync-web3';
import * as hre from 'hardhat';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';
import { ethers } from 'ethers';

const RICH_WALLET_PK =
    '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110';

async function deployzkNFT(deployer: Deployer): Promise<Contract> {
    const artifact = await deployer.loadArtifact('zkNFT');
    return await deployer.deploy(artifact);
}

describe('zkNFT', function () {
    it("Should minter have 1 token after mint", async function () {
        const provider = Provider.getDefaultProvider();

        const wallet = new Wallet(RICH_WALLET_PK, provider);
        const deployer = new Deployer(hre, wallet);

        const zkNFT = await deployzkNFT(deployer);

        const mintTxn = await zkNFT.mint(1);

        await mintTxn.wait();

        const balance = await zkNFT.balanceOf(wallet.address);

        expect(balance._hex).to.eq(ethers.utils.hexlify(1));
    });
});
