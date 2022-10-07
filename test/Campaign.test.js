const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../build/contracts/CampaignFactory.json');
const compiledCampaign = require('../build/contracts/Campaign.json');   

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    //Old method below to fetch a contract
    // factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'})
 
    await factory.methods.createCampaign('10').send({ 
        from: accounts[0], 
        gas: '1000000'
    });

    // takes the 1st element from returend array which have all instances of campaigns saved
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    //Old method below to fetch a contract
    // campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress)
});

describe('Campaigns', () => {

    it('1: deploys a fatcory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });    

    it('2: marks caller as campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('3: allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: 200,
            from: accounts[1],
            gas: '1000000'
        })

        //@ passing value to mapping
        const isContributor = campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);      
    })

    //@If a contributor contributes twice, will he be counted twice. This way the approvalCount will be less and the approveRequest may fail.
    it('4: campaign has set minimum contribution for the contributors', () => {
        const minContribution = campaign.methods.minimumContribution().call();
        assert(minContribution);
    })

    it('5: manager has the ability to make a payment request', async () => {
        await campaign.methods.createRequest('Mac', 100, accounts[3])
        .send({
            from: accounts[0],
            gas: 1000000
        });
        //@ passing value to array
        const request = await campaign.methods.requests(0).call();
        assert.equal('Mac', request.description);
    })

    it('6: processes request', async() => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: parseFloat(web3.utils.toWei('10', 'ether')),
        })

        await campaign.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        })

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        assert(balance > 104);
    })
})
