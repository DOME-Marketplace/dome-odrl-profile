# DOME Replication

## Content

- [Introduction](#introduction)
- [Big Picture](#big-picture)
- [Use Case](#use-case)
- [References](#references)

*Content 'DOME Replication'.*

---

## Introduction

---

## Big Picture

Taken from [**Paolo Fabriani
** (PFA), https://docs.google.com/document/d/1PdUaLQPMaaFvkU18QUcadMA8VROqpxQk1LzX5M0aLA0/](https://docs.google.com/document/d/1PdUaLQPMaaFvkU18QUcadMA8VROqpxQk1LzX5M0aLA0/) and slightly modified, to express more precise wording and spread given requirements and detailed specs. All main statements of PFAs proposal are still the same!

> > Version by JLA (nicos), wordings only, **nothing** on main topics!
>> - options are spreaded only
>> - most of those options must be discussed/defined (so: leading to some new requirements?!?), to be usable in policies, rules and nested constraints
>
>> - **usage control** moves to “access control” (reason: this chapter handles “access control”)
>> - **Acceptance Policies** :: has to be clarified before commented (by JLA)
>> - **visibility control** moves to **usage control** (reason: this chapter handles the usage of data provided by a
     *source-replicator*, consumed by a *sink-replicator* that makes handouts to registered/unregistered users…)
>> - **Access Control** Policies **should
     ** be the first-class-citizens, here the story (of data exchange/replication) begins, so we will start on those as examples, too.

### On Catalog Replication (i.e. definition of Access Control Policies)

As a marketplace owner (called the [*source*](#replication-source)-marketplace,
*source*) I want to set Replication Policies (also understood as Replication Offer) based on various criteria:

> JLA: “replication policies”: introduced here for the first time, this wording is only used once…
>
> JLA: understanding the whole process as “replication”, but in the end there is a data-provider (the source) exchanging data (the offering/catalogue) with interested data-consumers (the sink), handout data to registered/unregistered (end-)users…

Specific marketplaces (identified by its id) as a first, but we will consider also:

- geographical
- domain
- time-based
- legal
- compliance

...depending on **source-marketplace requirements to control where my product offerings (or catalogues) can be exposed
** (called the *sink*-marketplace, *sink*).

Replication can apply to:

- single product-offerings

> JLA: low-hanging fruit: we start with a very single offering, *the* product-offering

- entire catalogs

Replication policies (those are **access control** policies) are a **desiderata
** from source marketplaces. No other marketplace is forced to publish if it does **NOT** agree.

In general the replication process involves two actors and two phases:

1. The [`source`](#replication-source) marketplace decides what to (ideally) replicate, where and under what conditions.
2. The [`sink`](#replication-sink) marketplace becomes aware of such a replication wish and, if agreed ([Replication Agreement](#replication-agreement), proceeds with the replication of the offering/catalog.

From a practical point of view, it was agreed that the process could work as follows:

1. The `source` marketplace publishes an offering. This will trigger a blockchain notification to all interested marketplaces (access nodes) who can access the endpoint of the product-offering/catalogue for retrieval. Through some kind of governance rules in DOME, we’ll agree that a successful retrieval of product-offering/catalogue also
   *entitles* replication on a `sink` marketplace.

> TODO: TBD:
>> notification to all interested marketplaces
>
> ...what does this mean?!? How is this 'group' of "interested" marketplaces (DOME-Participants) build up?!?

2. At the same time, the `source` marketplace will define some Access Control Policies for given product-offering/catalogue (through the GUI, translated to ODRL and managed locally within the access node by local Policy Enforcement Point (
   **PEP**), Policy Decision Point (**PDP**)).

>
>> ...managed locally...
>
> this is the Policy Administration Point (**PAP**)

3. When the `sink`-marketplace tries to access the catalogue, the `source`-marketplace will enforce the Access Control Policies (through
   **PEP**/**PDP**). A successful retrieval means that replication is allowed.
4. It’s up to the `sink`-marketplace to decide whether to expose the offering or not. However, if it agrees to publish, this should happen according to Usage Control Policies (Visibility Policies, see below).

>
> > if it agrees
>
> FOR CLARIFICATION ONLY: this is some sort of quiet-agreement, there is **NO
** bilateral agreement (expressed in a very special Agreement Policy)
>
> JLA: “visibility policies”: these are the policies for Usage Control - given `source` expresses why and how given offer/catalogue could be provided on `sink's` side to third party (here: “registered/unregister user”)

Note 1: being the above process entirely on the `source`-side and assuming that granted access means *replication
allowed*, every marketplace in the federation is free to implement this as it wishes (or do not implement it at all). However, the DOME central marketplace (i.e. the BAE) should implement it as we are discussing and defining here.

> PAOLO :: TODO: open issue: how to manage a change in the replication policy (in particular, any restriction of it) after a catalogue has been already replicated? Should the source emit an ‘offering changed’ event to force a re-retrieval of the content possibly denying the access?

### On Acceptance Policies

> TODO: to be clarified: JLA: this seems to be a special use case

As a DOME-Marketplace operator (thus, through the BAE) I can set acceptance policies based on criteria to control which offerings from other providers can be exposed on the DOME-Marketplace. Criteria can consider attributes of the `source`-marketplace, e.g.:

- legal information
- certification schemes
- country
- domain of activity

as well of the catalogue/product-offering, e.g.:

- certifications
- type of the service
- category of the service

Any federated marketplace can manage this as it wishes, or decide not to filter any incoming request, or manage it by manual processes, no matter. However, the DOME central marketplace should include the following features:

- a GUI to express/browse/update acceptance policies (maybe in a simplified way)
- a low-level language to express Acceptance Policies.
- a filtering mechanism so that any offering available for replication (see above) is checked against such rules. Whenever rules are passed, the offering/catalogue becomes automatically visible on the DOME-Marketplace.

### On Usage Control Policies

> JLA: here the second switch **Visibility** Policies to **Usage Control** Policies

As a marketplace or product/service provider, I can set Usage Control Policies based on criteria, e.g.:

- customer properties
- > JLA: TBC@all: what are those customer *properties*?

to control which customers (within federated marketplaces) can see my (here "my": this is the replication-`source`!) offerings (on given replication-`sink`). Also, depending on some other criteria, e.g.:

- registered user
- unregistered user

as a seller:

- vendor
- distributor
- reseller

I want to set **Usage Control** Policies on **specific offering metadata**, e.g.:

- price

> JLA: let us focus on **price** at the beginning, so we can use it (if all
*problems* are understood and/or solved) as some sort of **blue-print** for other properties...

Similar to catalog replication, but enforcement (of given Usage Control Policies) here can only be done on the `sink`-marketplace. This means that the catalog/offering content should be made available entirely

> JLA: “this means”: given sink understands given usage control (exposed by source; a machine-readable policy; here: ODRL) and
**MUST
** enforce/evaluate nested policy-rules at runtime (depending on current customer (within federated marketplaces); registered/unregistered user

> JLA: “entirely”: what does this mean, more precise? The full information (here: offering) is still “filtered” by given Access Control (on source-side)
to the sink (the source can’t know in advance who will access the sink marketplace); then it’s up to the sink marketplace to

> JLA: 1) 2) : here we go: sink understands sources usage control and makes it to some sort of access control un sink-side >>>>>

1. evaluate if the offering has to be shown or not to the customer (end-user)
2. show only allowed offering metadata (e.g. *price*).

- metadata: *price*

This also means that the rules visibility (nested in defined Usage Control Policies) should be made available to the `sink` (can not be enforced on the `source` as with replication) and must be understood by it (need for agreed format and semantics).

---

## Terminology

### Replication Source

Replication Source (`source`, DOME-Role). `source`, a DOME-Marketplace Participant, acting as a Data Provider (DOME-Role) for its catalogues and/or product-offerings, acting as a replication partner.

### Replication Sink

Replication Sink (`sink`, DOME-Role). `sink`, a DOME-Marketplace Participant, acting as a Data Consumer (DOME-Role), acting as a replication partner consuming offered catalogues and/of product-offerings.

### Replication Offer

Given `source` offers replication (process) to interested DOME-Marketplace Participants.

> JLA: TODO: IMPORTANT: doing so, given `source` **SHOULD
** provide (if present/needed) correlated Usage Control Policy (Visibility Control), so interested Participants (potential `sink`-marketplaces) are able to see, what they are allowed to do with given `source's` product-offerings/catalogues and - much more interesting - what definitely
**NOT**.

> An accepted offer leads to a [Replication Agreement](#replication-agreement); in processing, given interested Participant (accepting the agreement) becoming the `sink`.
>
> TODO: TBD: JLAs idea: but JLA thinks, this is **NOT** correct, because `source`
>> ### Replication Request
>>
>> Targeted on an existing [Replication Offer](#replication-offer) the potential `sink` sends a Replication Request.
>>
>> ### Replication Agreement
>>
>> The agreement between [`source`](#replication-source) and [`sink`](#replication-sink) (both DOME-Marketplace Participants) under which circumstances Replication Process will be performed successfully.
>>

### Usage Control by Replication-source

> REM: the artist formerly known as **Visibility Control**

Usage Control in Replication, formulated by given data-owner (here: the `source`-maketplace), expresses how the Replication-Partner (`sink`) is allowed to present product-offers/catalogues to third party (here: the marketplace-customer).

All `sinks` **MUST** understand (**MUST** have the capability of enforcing `source's`) Usage Control Policies!

### Access Control on Replication-source-side

The `source` defines Access Control Policies (hosted in its own Policy Administration Point (**PAP
**)), those are used to control access on offered products/catalogues, if reacting Participants (here: potential `sink`-marketplaces) try to replicate given offerings (data-request).

#### Example

Authenticated user see file 'price', anonymous one's **NOT**.

- [https://www.all-puppets.org/policy/control/usage/_6800](../draft/_6800.ttl)

---

## Use Case

###  

## References

---
