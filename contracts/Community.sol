pragma solidity ^0.4.18;

contract Community {
    struct Player {
        uint balance;
        uint health;
        uint stress;
        uint status;   // 0 for all-good
                       // 1 for hungry
                       // 2 for cold
                       // 3 for hungry and cold
    }

    Player[] public playerList;
    uint public shelter;
    uint public foodBank;
    uint public clothing;
    bool public carePackage;

    function Community() public {
        // playerList is automatically initialized to an empty
        shelter = 10;
        foodBank = 10;
        clothing = 10;
        carePackage = true;
        // TODO: randomize initial institution values
    }

    function consumeShelter() public returns (uint) {
        if (shelter == 0) {
            return 0;
        }

        shelter--;
        return shelter;
    }

    function donateShelter(uint value) payable public returns (uint) {
        uint EXCHANGE_RATE = 100;
        uint amount = value * EXCHANGE_RATE;
        // TODO: track how much every person's donated
        shelter = shelter + amount;
        return amount;
    }

    function getShelter() public returns (uint) {
        return shelter;
    }
}