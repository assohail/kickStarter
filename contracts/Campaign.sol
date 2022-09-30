// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaign {
    struct Request {
       string description;
       uint value;
       address recepient;
       bool complete; 
       uint approvalCount;
       mapping (address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping (address => bool) public approvers;

    // declare modifiers above constructor
    modifier restricted() {
        require (msg.sender == manager);
        _;
    }
    constructor (uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    } 

    function constribute() public payable {
        require (msg.value >= minimumContribution);
        approvers[msg.sender];
    }

    int[] public numbers;

    function createRequest(
        string memory description, uint value, address recepient
        ) public restricted {
            
        Request storage newRequest = Request({
            description: description,
            value: value,
            recepient: recepient,
            complete: false
        });
        
        // the two methods are same for struct
        // Request memory newRequest = Request(description, value, recepient, false);

        // requests.push(newRequest); 

        numbers.push(1);
        numbers.push(32);
        // int[] storage arr = numbers;
        // changeArray(numbers);
    }
    
    
    //@ how to pass array or another refernce type data structure as parameter to function for changing it 
    // function changeArray(int[] storage arr) public pure{
    //     arr[0]= 20;
    // }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        //one contributor should not be able to approve or disapprove a request multiple times
        
        //the following method consumes too much gas
        // bool isApprover = false;
        // for (uint i=0; i > approvers.length; i++) {
        //    if (approvers[i] == msg.sender) {
        //        isApprover = true;
        //    }
        // }
        // require(isApprover);

        require (approvers[msg.sender]);

        // make sure the person has not voted before
        // for (uint i=0; i< request.approvers.length; i++){
        //     require (approvers != msg.sender);
        // }


        // @have a look
        require (!requests[index].approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;

        
    }

    function finalizeRequest() public {
    }

}

