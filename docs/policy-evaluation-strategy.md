# Policy Evaluation Strategy

> **Author:** Simon Petrac \<spetrac@nicos-ag.com\>

## Simplified Approach

- [Schemas](../schemas/simplified/)

The different term types of the simplified approach are used for different scenarios,
therefore only one term type must be used at a specific enforcement point,
e.g. at replication of offerings only the marketplace restrictions are relevant.

> There can be as many terms on a product offering as needed.
> Usually, multiple terms are used for different term types,
> but they could also be used to specify different combinations of rules.
> Because each team is validated individually, an action like showing offerings to visitors
> is prohibited if even one associated term evaluates to invalid.

```mermaid
stateDiagram-v2
  [*] --> Q1_1

  Q1_1 : Does a marketplace try to replicate an offering?
  Q1_1 --> Q1_2 : Yes
  Q1_1 --> Q2_1 : No
  Q1_2 : Are there any marketplace restrictions applied to that offering?
  Q1_2 --> Q1_3 : Yes
  Q1_2 --> VALID : No
  Q1_3 : Does all marketplace restrictions evaluate to be valid?
  Q1_3 --> VALID : Yes
  Q1_3 --> INVALID : No

  Q2_1 : Does a visitor of a marketplace try to access an offering?
  Q2_1 --> Q2_2 : Yes
  Q2_1 --> Q3_1 : No
  Q2_2 : Are there any customer restrictions applied to that offering?
  Q2_2 --> Q2_3 : Yes
  Q2_2 --> VALID : No
  Q2_3 : Does all customer restrictions evaluate to be valid?
  Q2_3 --> VALID : Yes
  Q2_3 --> INVALID : No

  Q3_1 : Does a customer of a marketplace try to contract an offering?
  Q3_1 --> Q3_2 : Yes
  Q3_1 --> VALID : No
  Q3_2 : Are there any product restrictions applied to that offering?
  Q3_2 --> Q3_3 : Yes
  Q3_2 --> VALID : No
  Q3_3 : Does all product restrictions evaluate to be valid?
  Q3_3 --> VALID : Yes
  Q3_3 --> INVALID : No

  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid

  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

### Marketplace Restriction

A term definition that collects all attributes,
which specifies restrictions on a product offering for whole marketplaces.

> The enforcement of this term should ideally be done by the source marketplace
> before the offering gets replicated to another marketplace.

```mermaid
stateDiagram-v2
  [*] --> Q1_1

  Q1_1 : Are there any prohibited marketplaces listed in the policy?
  Q1_1 --> Q1_2 : Yes
  Q1_1 --> Q2_1 : No
  Q1_2 : Is the destination marketplace in the list of prohibited marketplaces?
  Q1_2 --> INVALID : Yes
  Q1_2 --> Q2_1 : No

  Q2_1 : Are there any permitted marketplaces listed in the policy?
  Q2_1 --> Q2_2 : Yes
  Q2_1 --> Q3_1 : No
  Q2_2 : Is the destination marketplaces in the list of permitted marketplaces?
  Q2_2 --> Q3_1 : Yes
  Q2_2 --> INVALID : No

  Q3_1 : Are there any legally prohibited regions listed in the policy?
  Q3_1 --> Q3_2 : Yes
  Q3_1 --> Q4_1 : No
  Q3_2 : Is the legal entity of the destination marketplace inside the listed prohibited region?
  Q3_2 --> INVALID : Yes
  Q3_2 --> Q4_1 : No

  Q4_1 : Are there any legally permitted regions listed in the policy?
  Q4_1 --> Q4_2 : Yes
  Q4_1 --> VALID : No
  Q4_2 : Is the legal entity of the destination marketplace inside the listed permitted region?
  Q4_2 --> VALID : Yes
  Q4_2 --> INVALID : No

  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid

  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

### Customer Restriction

A term definition that collects all attributes,
which specifies restrictions on product- and offering details for customer groups.

> The enforcement of this term can only be done by the offering marketplace.
> It should prevent data about the product to be leaked to non authorized customers.

```mermaid
stateDiagram-v2
  [*] --> Q1_1

  Q1_1 : Does the policy define hidden properties?
  Q1_1 --> Q1_2 : Yes
  Q1_1 --> Q2_1 : No
  Q1_2 : Does the marketplace show any listed hidden properties to visitors?
  Q1_2 --> INVALID : Yes
  Q1_2 --> Q2_1 : No

  Q2_1 : Does the policy restrict the offering only to authenticated users?
  Q2_1 --> Q2_2 : Yes
  Q2_1 --> VALID : No
  Q2_2 : Is the current visitor an authenticated user?
  Q2_2 --> Q3_1 : Yes
  Q2_2 --> INVALID : No

  Q3_1 : Are there any prohibited customer regions listed in the policy?
  Q3_1 --> Q3_2 : Yes
  Q3_1 --> Q4_1 : No
  Q3_2 : Is the requesting customer inside the listed prohibited region?
  Q3_2 --> INVALID : Yes
  Q3_2 --> Q4_1 : No

  Q4_1 : Are there any permitted customer regions listed in the policy?
  Q4_1 --> Q4_2 : Yes
  Q4_1 --> VALID : No
  Q4_2 : Is the requesting customer inside the listed permitted region?
  Q4_2 --> VALID : Yes
  Q4_2 --> INVALID : No

  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid

  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

### Product Restriction

A term definition that collects all attributes,
which specifies restrictions on a product itself.

> The enforcement of this term can only be done by the offering marketplace.
> It should prevent customers to contract offerings that cannot be supplied to them.
> Visibility is not restricted by this per se and enforcement of this term is not critical,
> because the provider can always deny a product request.

```mermaid
stateDiagram-v2
  [*] --> Q1_1

  Q1_1 : Are there any availability regions listed in the policy?
  Q1_1 --> Q1_2 : Yes
  Q1_1 --> Q2_1 : No
  Q1_2 : Is the target location for the service or product inside the listed available region?
  Q1_2 --> INVALID : Yes
  Q1_2 --> Q2_1 : No

  Q2_1 : Are there any unavailability regions listed in the policy?
  Q2_1 --> Q2_2 : Yes
  Q2_1 --> VALID : No
  Q2_2 : Is the target location for the service or product inside the listed unavailable region?
  Q2_2 --> VALID : Yes
  Q2_2 --> INVALID : No

  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid

  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

## ODRL Approach

- [Schemas](../schemas/odrl/)

> TODO