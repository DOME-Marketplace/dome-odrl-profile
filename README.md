# ODRL Profile for DOME

## Links

- [ODRL Information Model](https://www.w3.org/TR/odrl-model/)
- [ODRL Vocabulary & Expression](https://www.w3.org/TR/odrl-vocab/)

## Documents

- [Catalogue Replication and Visibility](docs/catalogue-replication-and-visibility.md)
- [TMForum APIs](docs/tm-forum-apis.md)
- [Catalogue Offerings Verifiable Signature](docs/catalogue-offerings-verifiable-signature.md)
- [Good to Know](docs/good-to-know.md)
  - [Resource Description Framework](docs/good-to-know.md#resource-description-framework)
  - [Turtle Format](docs/good-to-know.md#turtle-format)
  - [JSON-LD Format](docs/good-to-know.md#json-ld-format)
  - [Rights Expression Language](docs/good-to-know.md#rights-expression-language)
  - [Open Digital Rights Language](docs/good-to-know.md#open-digital-rights-language)
  - [eXtensible Access Control Markup Language](docs/good-to-know.md#extensible-access-control-markup-language)
  - [Distributed Open Marketplace for Europe](docs/good-to-know.md#distributed-open-marketplace-for-europe)
- [~~Policy Use Cases~~](docs/policy-use-cases.md)
- [Catalogue visibility control](docs/catalogue-visibility-control.md)
  - [Use cases](docs/catalogue-visibility-control.md#use-cases)
- [Policy Evaluation Strategy](docs/policy-evaluation-strategy.md)
- [Schema Extension of Entities in TMForum](docs/tm-forum-schema-extension.md)

## Schemas

- **Simplified**
  - [OperatorRestriction](schemas/simplified/OperatorRestriction.schema.json)
    - [OperatorRef](schemas/simplified/OperatorRef.schema.json)
    - [GeographicAddress](schemas/simplified/GeographicAddress.schema.json)
      - [Example: _Product offering with restriction on operators legal region._](schemas/simplified/examples/product-offering-with-country-restriction.json)
    - [GeographicLocation](schemas/simplified/GeographicLocation.schema.json)
  - [CustomerRestriction](schemas/simplified/CustomerRestriction.schema.json)
  - [ProductRestriction](schemas/simplified/ProductRestriction.schema.json)
- **ODRL**
  - [Policy](schemas/odrl/Policy.schema.json)
    - [IRI](schemas/odrl/IRI.schema.json)
    - [ConflictTerm](schemas/odrl/ConflictTerm.schema.json)
      - [ConflictTermId](schemas/odrl/ConflictTermId.schema.json)
  - [Rule](schemas/odrl/Rule.schema.json)
    - [Permission](schemas/odrl/Permission.schema.json)
    - [Prohibition](schemas/odrl/Prohibition.schema.json)
    - [Duty](schemas/odrl/Duty.schema.json)
  - [Action](schemas/odrl/Action.schema.json)
    - [ActionId](schemas/odrl/ActionId.json)
    - [ActionOrId](schemas/odrl/ActionOrId.schema.json)
  - [Asset](schemas/odrl/Asset.schema.json)
    - [AssetCollection](schemas/odrl/AssetCollection.schema.json)
    - [AssetOrIRI](schemas/odrl/AssetOrIRI.schema.json)
  - [Party](schemas/odrl/Party.schema.json)
    - [PartyCollection](schemas/odrl/PartyCollection.schema.json)
    - [PartyOrIRI](schemas/odrl/PartyOrIRI.schema.json)
  - [Constraint](schemas/odrl/Constraint.schema.json)
    - [LeftOperand](schemas/odrl/LeftOperand.schema.json)
      - [LeftOperandId](schemas/odrl/LeftOperandId.schema.json)
    - [Operator](schemas/odrl/Operator.schema.json)
      - [OperatorId](schemas/odrl/OperatorId.schema.json)
    - [RightOperand](schemas/odrl/RightOperand.schema.json)
      - [RightOperandId](schemas/odrl/RightOperandId.schema.json)
      - [RightOperandReference](schemas/odrl/RightOperandReference.schema.json)
    - [UnitId](schemas/odrl/UnitId.schema.json)
    - [DataTypeId](schemas/odrl/DataTypeId.schema.json)
  - [LogicalConstraint](schemas/odrl/LogicalConstraint.schema.json)
    - [ConstraintOrLogicalConstraint](schemas/odrl/ConstraintOrLogicalConstraint.schema.json)

## Profiles

- [Marketplace Offerings](profiles/marketplace-offerings.md)

## Model

- [Core Vocabulary](model/dome.ttl)
- [Replication Vocabulary](model/replication.ttl)
- [LD-Proof Credentials](model/credentials.json)

## Policies

- [Example](policies/example.ttl)

## Draft

- [DOME ODRL Profile](draft/dome-op.md)
- [TMForum APIs Model](draft/tmforum-apis-model.md)
- [DOME Marketplace ODRL-Policies](draft/marketplace-policies.md)
- [DOME Replication](draft/replication-policies.md)