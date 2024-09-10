# ODRL Profile for DOME

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

## Model

- [Core Vocabulary](model/dome.ttl)
- [Replication Vocabulary](model/replication.ttl)
- [LD-Proof Credentials](model/credentials.json)

## Policies

- [Example](policies/example.ttl)

## Schemas

- **ODRL**
  - [PolicySchema](schemas/odrl/Policy.schema.json)
  - [RuleSchema](schemas/odrl/Rule.schema.json)
  - [ActionSchema](schemas/odrl/Action.schema.json)
  - [AssetSchema](schemas/odrl/Asset.schema.json)
  - [PartySchema](schemas/odrl/Party.schema.json)
  - [ConstraintSchema](schemas/odrl/Constraint.schema.json)
- **TMForum** _(only necessary parts for ODRL)_
  - [CommonSchema](schemas/tmforum/Common.schema.json)
  - [ProductSchema](schemas/tmforum/Product.schema.json)
  - [ResourceSchema](schemas/tmforum/Resource.schema.json)
  - [ServiceSchema](schemas/tmforum/Service.schema.json)
  - [EngagedPartySchema](schemas/tmforum/EngagedParty.schema.json)
  - [MarketingSalesSchema](schemas/tmforum/MarketingSales.schema.json)
- **Custom**
  - [Draft 01](schemas/custom/Draft-01.schema.json)
  - [Draft 02](schemas/custom/Draft-02.schema.json)

## Draft

- [DOME ODRL Profile](draft/dome-op.md)
- [TMForum APIs Model](draft/tmforum-apis-model.md)
- [DOME Marketplace ODRL-Policies](draft/marketplace-policies.md)
- [DOME Replication](draft/replication-policies.md)