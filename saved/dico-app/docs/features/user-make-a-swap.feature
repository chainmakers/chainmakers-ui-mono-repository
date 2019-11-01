Feature: User make a swap
  As a User
  In order to use for trading
  I want to make a swap

  Background:
    GIVEN user is loggedin app

  Scenario: Normal swap
    GIVEN utxos is large than 2
    WHEN user select payment coin
    WHEN user set correct amount
    WHEN user click buy
    THEN swap is processing

  Scenario: Cant find a deposit that is close enough in size
    GIVEN utxos is large than 2
    WHEN user select payment coin
    WHEN user set amount large than balance
    WHEN user click buy
    THEN swap throw new error "cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade"

  Scenario: Auto splitting
    GIVEN utxos is less than 2
    WHEN user select payment coin
    WHEN user set correct amount
    WHEN user click buy
    THEN the pop up is showed with content "You will need at least 2 UTXOs to perform your swap. We are trying to split it for you. Dont turn off the application." and swap is processing.
 