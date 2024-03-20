# DOME Marketplace ODRL-Policies

## Content

- [Introduction](#introduction)
- [2001, modify, seller](#2001)
- [2002, set status 'published', manager](#2002)
- [2003, create offering, seller](#2003)

*Content 'DOME Marketplace ODRL-Policies'.*

---

## Introduction

---

## 2001

> A user is only allowed to **modify** product-offerings (or any other entity) that are owned by the organization it acts on behalf of and if he is in role **seller**.

*owned by the organization*: owned === relatedParty, did
*acts on behalf of organization*: organization === the VC.issuer, did


- [_2001, ttl](../draft/_2001.ttl)
- [_2001, json](../draft/_2001.json)

--

## 2002

> A user is only allowed to **set the status of a product-offering** to **"published"** for offerings owned by the organization it acts on behalf of and has the role **manager** (or something similar, probably has to be specified more in detail)

- [_2002, ttl](../draft/_2002.ttl)
- [_2002, json](../draft/_2002.json)

## 2003

> A user is only allowed to **create product-offerings** (or any other entity) that is owned by the organization it acts on behalf of and if he is in rolle **seller**.

- [_2003, ttl](../draft/_2003.ttl)
- [_2003, json](../draft/_2003.json)

---
