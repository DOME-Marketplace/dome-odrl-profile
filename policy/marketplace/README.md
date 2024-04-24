# DOME Marketplace ODRL-Policies

## Content

- [Introduction](#introduction)
- 200*, **TMF**
- [2001, modify, seller](#2001)
- [2001-2, ...with non-blank-node constraint](#2001-2)
- [2001-3, `relatedParty` as `odrl:AssetCollection`](#2001-3)
- [2002, set status 'published', manager](#2002)
- [2003, create offering, seller](#2003)
- 300*, **Identity**
- [3001, Onboarding](#3001)
- [3002, ProductOffering, **create**](#3002)
- [3003, ProductOffering, **update**](#3003)
- [3004, ProductOffering, **delete**](#3004)
- [3005, Trusted Participant List](#3005)

*Content 'DOME Marketplace ODRL-Policies'.*

---

## Introduction

(ttl's are preferred to read, because we see some clarifying annotations here...)

---

## 2001

> A user is only allowed to **modify** product-offerings (or any other entity)
> that are owned by the organization it acts on behalf of and if he is in role **seller**.

- *owned by the organization*: owned === relatedParty, did
- *acts on behalf of organization*: organization === the VC.issuer, did

- [_2001, ttl](../draft/_2001.ttl)
- [_2001, json](../draft/_2001.json)

### 2001-2

Refinement (`odrl:refinement`) as stand-alone constraint. So this constraint is *usable* in many places.

- [_2001-2, ttl](../draft/_2001-2.ttl)
- [_2001-2, json](../draft/_2001-2.json)

### 2001-3

`relatedParty` as `odrl:AssetCollection`.

- [_2001-3, ttl](../draft/_2001-3.ttl)
- [_2001-3, json](../draft/_2001-3.json)

--

## 2002

> A user is only allowed to **set the status of a product-offering** to **"published"**
> for offerings owned by the organization it acts on behalf of and has the role **manager**
> (or something similar, probably has to be specified more in detail)

- [_2002, ttl](../draft/_2002.ttl)
- [_2002, json](../draft/_2002.json)

## 2003

> A user is only allowed to **create product-offerings** (or any other entity)
> that is owned by the organization it acts on behalf of and if he is in rolle **seller**.

- [_2003, ttl](../draft/_2003.ttl)
- [_2003, json](../draft/_2003.json)

---

## 300*

Based on Example VC/LEARCredential:

- [_3000_VC_1.js](../marketplace/_3000_VC_1.js)


## 3001

> When the mandate specifies power to Execute **Onboarding**, the PDP of the DOME Operator
> should enable access to the **onboarding process** of DOME.

- [_3001, ttl](../draft/_3001.ttl)
- [_3001, json](../draft/_3001.json)

---

## 3002

> When the mandate specifies power to **Create ProductOffering**, the PDP of the DOME Operator
> should enable access to the TMF APIs to **create** ALL the entities related to a **Product offering**.

- [_3002, ttl](../draft/_3002.ttl)
- [_3002, json](../draft/_3002.json)

---

## 3003

> When the mandate specifies power to **Update ProductOffering**, the PDP of the DOME Operator
> should enable access to the TMF APIs to **update** ALL the entities related to a **Product offering**.

- [_3003, ttl](../draft/_3003.ttl)
- [_3003, json](../draft/_3003.json)

---

## 3004

> When the mandate specifies power to **Delete ProductOffering**, the PDP of the DOME Operator
> should enable access to the TMF APIs to **delete** ALL the entities related to a **Product offering**.

- [_3004, ttl](../draft/_3004.ttl)
- [_3004, json](../draft/_3004.json)

---

## 3005

> The issuer **MUST** be member of DOME's Trusted Participant List (global and product-specific)
>     taken from: "DOME D3.4 - DOME Reference Architecture and Specifications V2"
>     (3.3.5.4 Query the Trusted Issuer Lists)

- [_3005, ttl](../draft/_3005.ttl)
- [_3005, json](../draft/_3005.json)

---