# Policy Evaluation Strategy

> **Author:** Simon Petrac \<spetrac@nicos-ag.com\>

## Simplified Approach

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
  Q2_2 : Are there any visibility restrictions applied to that offering?
  Q2_2 --> Q2_3 : Yes
  Q2_2 --> VALID : No
  Q2_3 : Does all visibility restrictions evaluate to be valid?
  Q2_3 --> VALID : Yes
  Q2_3 --> INVALID : No
  Q3_1 : Does a customer of a marketplace try to request an offering?
  Q3_1 --> Q3_2 : Yes
  Q3_1 --> VALID : No
  Q3_2 : Are there any customer restrictions applied to that offering?
  Q3_2 --> Q3_3 : Yes
  Q3_2 --> VALID : No
  Q3_3 : Does all customer restrictions evaluate to be valid?
  Q3_3 --> VALID : Yes
  Q3_3 --> INVALID : No
  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid
  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

### Marketplace Restriction

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

### Visibility Restriction

```mermaid
stateDiagram-v2
  [*] --> Q1_1
  Q1_1 : Does the policy restrict visibility only to authenticated users?
  Q1_1 --> Q1_2 : Yes
  Q1_1 --> Q2_1 : No
  Q1_2 : Is the current visitor an authenticated user?
  Q1_2 --> Q2_1 : Yes
  Q1_2 --> INVALID : No
  Q2_1 : Does the policy define hidden properties?
  Q2_1 --> Q2_2 : Yes
  Q2_1 --> VALID : No
  Q2_2 : Does the marketplace show any listed hidden properties to visitors?
  Q2_2 --> INVALID : Yes
  Q2_2 --> VALID : No
  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid
  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

### Customer Restriction

```mermaid
stateDiagram-v2
  [*] --> Q1_1
  Q1_1 : Are there any prohibited customer regions listed in the policy?
  Q1_1 --> Q1_2 : Yes
  Q1_1 --> Q2_1 : No
  Q1_2 : Is the requesting customer inside the listed prohibited region?
  Q1_2 --> INVALID : Yes
  Q1_2 --> Q2_1 : No
  Q2_1 : Are there any permitted customer regions listed in the policy?
  Q2_1 --> Q2_2 : Yes
  Q2_1 --> VALID : No
  Q2_2 : Is the requesting customer inside the listed permitted region?
  Q2_2 --> VALID : Yes
  Q2_2 --> INVALID : No
  VALID:::FinalEvent : Valid
  INVALID:::ErrorEvent : Invalid
  classDef FinalEvent fill:darkgreen,color:white
  classDef ErrorEvent fill:darkred,color:white
```

## ODRL Approach

> TODO