const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source,1).contracts;

console.log(output)
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'), 
        output[contract]
    )
}


// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['Campaign.sol'][contractName].evm.bytecode.object
//   );

