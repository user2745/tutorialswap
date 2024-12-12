require("@nomiclabs/hardhat-waffle");
const { ethers } = require("ethers");
const { expect } = require("chai");

const toWei = (value) => ethers.utils.parseEther(value.toString());
const getBalance = ethers.provider.getBalance;
const fromWei = (value) =>
  ethers.utils.formatEther(
    typeof value === "string" ? value : value.toString()
  );


describe('Exchange', () => {

  let owner, token, user, exchange;

  beforeEach(async () => { 
    
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    token = await Token.deploy("Token", "TKN", toWei(1000000));

    await token.deployed();

   });

   it('should deploy the contract', async () => {
    expect(await exchange.deployed()).to.equal(exchange);
   });


   describe('addLiquidity', () => {
    it('should add liquidity', async () => {
      await token.approve(exchange.address, toWei(1000));
      await exchange.addLiquidity(toWei(1000), toWei(1000));
      expect(await exchange.balanceOf(owner.address)).to.equal(toWei(1000));
    });

    it('should not add liquidity if token is not approved', async () => {
      await expect(exchange.addLiquidity(toWei(1000), toWei(1000))).to.be.revertedWith('ERC20: transfer amount exceeds allowance');
    });

    it('should not add liquidity if token balance is not enough', async () => {
      await token.approve(exchange.address, toWei(1000));
      await expect(exchange.addLiquidity(toWei(1000), toWei(1000))).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

    it('should not add liquidity if ETH balance is not enough', async () => {
      await token.approve(exchange.address, toWei(1000));
      await expect(exchange.addLiquidity(toWei(1000), toWei(1000))).to.be.revertedWith('ETH balance is not enough');
    });

    it('should not add liquidity if token amount is 0', async () => {
      await token.approve(exchange.address, toWei(1000));
      await expect(exchange.addLiquidity(0, toWei(1000))).to.be.revertedWith('token amount is 0');
    });

    it('should not add liquidity if ETH amount is 0', async () => {
      await token.approve(exchange.address, toWei(1000));
      await expect(exchange.addLiquidity(toWei(1000), 0)).to.be.revertedWith('ETH amount is 0');
    });

    it('should not add liquidity if deadline is passed', async () => {
      await token.approve(exchange.address, toWei(1000));
      await expect(exchange.addLiquidity(toWei(1000), toWei(1000), { deadline: 0 })).to.be.revertedWith('deadline is passed');
    });

  });
})