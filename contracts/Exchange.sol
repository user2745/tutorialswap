// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Exchange {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        tokenAddress = _tokenAddress;
    }

    function addLiquidity(uint256 _tokenAmount) public payable {
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), _tokenAmount);
    }

    function getReserve() public view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }
}
