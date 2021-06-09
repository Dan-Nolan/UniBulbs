//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.6;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bulb is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Bulb", "BLB") {
        _mint(msg.sender, initialSupply);
    }
}
