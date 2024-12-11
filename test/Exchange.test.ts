require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");
const { ethers } = require("ethers");

const toWei = (value) => ethers.utils.parseEther(value.toString());

const fromWei = (value) =>
  ethers.utils.formatEther(
    typeof value === "string" ? value : value.toString()
  );

const getBalance = ethers.provider.getBalance;