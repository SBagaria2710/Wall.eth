const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transaction = await Transactions.deploy();

  await transaction.deployed();

  console.log("Transactions deployed to:", transaction.address);
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
})();
