// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Lottery {
    address public manager;
    address[] public fools;
    mapping (address => uint) balance;
    uint public comparisonFool;
    
    constructor() {
        manager = msg.sender;
    }
    
    function enter() public payable {
        if(fools.length == 0) {
            uint comparison = 1000000000000000000 + 500000000000000000;
            comparisonFool = comparison * balance[fools[0]];
            require(msg.value >= 1 ether, "Value is not 1 ether");
            fools.push(msg.sender);
        } 
        // else {
        //     require (msg.value >= comparisonFool);
        //     fools.push(msg.sender);
        //     //@declare king
        // }
        
    }
    
    // function pickKing() public restricted {
    //     //@ decide value to send
    //     fools[0].transfer(this.balance);
    //     fools = new address[](0);
    // }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    // function getFools() public view returns (address[]) {
    //     return fools;
    // }
}   