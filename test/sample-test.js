const { formatEther, parseEther } = ethers.utils;
const { MaxUint256 } = ethers.constants;

const routerAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const factoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const wethAddr = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

describe("Uniswap", function() {
  const supply = parseEther("100");
  let router, factory, bulb;
  beforeEach(async () => {
    router = await ethers.getContractAt("IUniswapV2Router02", routerAddr);
    factory = await ethers.getContractAt("IUniswapV2Factory", factoryAddr);

    const Bulb = await ethers.getContractFactory("Bulb");
    bulb = await Bulb.deploy(supply);
    await bulb.deployed();
  });

  it("should allow trades", async function() {
    const [addr1] = await ethers.provider.listAccounts();

    await bulb.approve(router.address, MaxUint256);
    await router.addLiquidityETH(bulb.address, supply, supply, supply, addr1, MaxUint256, {
      value: supply
    });

    console.log("bulb balance before", formatEther(await bulb.balanceOf(addr1)));

    await router.swapExactETHForTokens(0, [wethAddr, bulb.address], addr1, MaxUint256, {
      value: parseEther("600")
    });

    console.log("bulb balance", formatEther(await bulb.balanceOf(addr1)));


    const pairAddr = await factory.getPair(bulb.address, wethAddr);
    const pair = await ethers.getContractAt("IUniswapV2Pair", pairAddr);

    const { reserve0, reserve1 } = await pair.getReserves();

    console.log({ token: formatEther(reserve0), weth: formatEther(reserve1) })
  });
});
