const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// const output = solc.compile(source,1).contracts;
// const outputs = JSON.parse(solc.compile(JSON.stringify(source,1)));
// const outputs = solc.compile(source,1);

// console.log(output);
// console.log(outputs)
fs.ensureDirSync(buildPath);

// for (let contract in output) {
//     fs.outputJSONSync(
//         path.resolve(buildPath, contract + '.json'), output[contract]
//     )
// }


// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['Campaign.sol'][contractName].evm.bytecode.object
//   );

    
//     fs.outputJSONSync(
//         path.resolve(buildPath, contractName, '.json'), output[contract]
//     )
// }


var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

var output = JSON.parse(solc.compile(JSON.stringify(input)))

module.exports = output.contracts["Campaign.sol"]["Campaign"];