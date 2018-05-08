const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');

// Delete any existing build directory
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read in the contracts from source
const sourcePath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(sourcePath, 'utf8');

// Compile contracts
const contracts = solc.compile(source, 1).contracts;

// Create a new build directory
fs.ensureDirSync(buildPath);

// Write out ABI and bytecode
for (let contract in contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    contracts[contract]
  );
}
