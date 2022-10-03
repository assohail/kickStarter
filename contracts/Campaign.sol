// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaign {
    struct Request {
       string description;
       uint value;
       address payable recepient;
       bool complete; 
       uint approvalCount;
       mapping (address => bool) approvals;
    }

    Request[] public requests;
    //@ PAYABLE ONLY TO: WRITE DESTRUCT FOR SAVING ETHERS FROM METAMASK
    address payable public manager;
    uint public minimumContribution;
    mapping (address => bool) public approvers;
    uint public approversCount;

    // declare modifiers above constructor
    modifier restricted() {
        require (msg.sender == manager);
        _;
    }
    constructor (uint minimum) {
        manager = payable(msg.sender);
        minimumContribution = minimum;
    } 

    function contribute() public payable {
        require (msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest (string memory description, uint value, address payable recepient) public restricted {
        //@TypeError: Type struct Campaign.Request is only valid in storage because it contains a (nested) mapping.
        // Request storage newRequest; 
        // the following is giving error
        // Request({
        //         description: description,
        //         value: value,
        //         recepient: recepient,
        //         complete: false,
        //         approvalCount: 0
        // });

        // newRequest.description = description;
        // newRequest.value = value;
        // newRequest.recepient = recepient;
        // newRequest.complete = false;
        // newRequest.approvalCount = 0;

        //@TypeError: Storage arrays with nested mappings do not support .push().
        // requests.push(newRequest);
        // to resolve above error

        //@TypeError: Data location can only be specified for array, struct or mapping types, but "storage" was given.
        uint length = requests.length;
        requests.push();
        Request storage newRequest_1 = requests[length];

        newRequest_1.description = description;
        newRequest_1.value = value;
        newRequest_1.recepient = recepient;
        newRequest_1.complete = false;
        newRequest_1.approvalCount = 0;
        // requests[length++] = newRequest_1;
    } 
    //@ how to pass array or another refernce type data structure as parameter to function for changing it 
    // function changeArray(int[] storage arr) public pure{
    //     arr[0]= 20;
    // }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require (approvers[msg.sender], "Should be contributor.");

        // @have a look
        require (!request.approvals[msg.sender], "Request already approved by you.");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public payable restricted {
        Request storage request = requests[index];
        require(!request.complete, "Request is already finalized.");
        require(request.approvalCount > (approversCount / 2), "Has not more than 50% approval.");
        request.complete = true;
        request.recepient.transfer(request.value);
    }

    function endCampaign() public restricted {
        manager.transfer(address(this).balance);
        selfdestruct(manager);
    }

}

