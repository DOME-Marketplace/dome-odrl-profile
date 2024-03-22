# DOME Marketplace ODRL-Policies

## Content

- [Introduction](#introduction)
- [2001, modify, seller](#2001)
- [2001-2, ...with non-blank-node constraint](#2001-2)
- [2001-3, `relatedParty` as `odrl:AssetCollection`](#2001-3)
- [2002, set status 'published', manager](#2002)
- [2003, create offering, seller](#2003)

*Content 'DOME Marketplace ODRL-Policies'.*

---

## Introduction

(ttl's are preferred to read, because we see some clarifying annotations here...)

---

## 2001

> A user is only allowed to **modify
** product-offerings (or any other entity) that are owned by the organization it acts on behalf of and if he is in role
**seller**.

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

> A user is only allowed to **set the status of a product-offering** to **"published"
** for offerings owned by the organization it acts on behalf of and has the role **manager
** (or something similar, probably has to be specified more in detail)

- [_2002, ttl](../draft/_2002.ttl)
- [_2002, json](../draft/_2002.json)

## 2003

> A user is only allowed to **create product-offerings
** (or any other entity) that is owned by the organization it acts on behalf of and if he is in rolle **seller**.

- [_2003, ttl](../draft/_2003.ttl)
- [_2003, json](../draft/_2003.json)

---
