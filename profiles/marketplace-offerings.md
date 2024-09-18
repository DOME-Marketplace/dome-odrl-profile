# Marketplace Offerings ODRL Profile

- **URI:** https://dome-marketplace.eu/odrl-profile/marketplace-offerings

## Actions

### `use`

Just like the general `odrl:use` action, this permits the usage over the whole product offering.
This is generally used to give federated marketplaces the right to use a product offering.

### `accept`

This action permits/prohibits the assigner to accept a product offering.
It can be used to restrict offerings to specific customer groups.

## Operators

### `locatedIn`

This operator compares the location of the LeftOperand value to the specified geographic location of the RightOperand.

## Left Operands

### `legalEntity`

This operand specifies the legal entity of the assigner.
Usually, the legal entity is relevant for marketplace replication, but could also be used for customers.

### `residence`

This operand specifies the residence of the assigner.
Usually, the residence is relevant for offerings that only want to address customers in a specific locality.

## Right Operands