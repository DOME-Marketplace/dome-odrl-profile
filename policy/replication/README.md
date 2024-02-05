# DOME Replication

## Content

- [Introduction](#introduction)
- [Big Picture](#big-picture)
- [References](#references)

*Content 'DOME Replication'.*

---

## Introduction

---

## Big Picture

Taken from [**Paolo Fabriani** (PFA), https://docs.google.com/document/d/1PdUaLQPMaaFvkU18QUcadMA8VROqpxQk1LzX5M0aLA0/](https://docs.google.com/document/d/1PdUaLQPMaaFvkU18QUcadMA8VROqpxQk1LzX5M0aLA0/) and slightly modified, to express more precise wording and spread given requirements and detailed specs. All main statements of PFAs proposal are still the same! 

>> Version by JLA (nicos), wordings only, **nothing** on main topics!
>> - options are spreaded only 
>> - most of those options must be discussed/defined (so: leading to some new requirements?!?), to be usable in policies, rules and nested constraints
> 
>> - **usage control** moves to “access control” (reason: this chapter handles “access control”)
>> - **Acceptance Policies** :: has to be clarified before commented (by JLA)
>> - **visibility control** moves to **usage control** (reason: this chapter handles the usage of data provided by a *source-replicator*, consumed by a *sink-replicator* that makes handouts to registered/unregistered users…)
>> - **Access Control** Policies **should** be the first-class-citizens, here the story (of data exchange/replication) begins, so we will start on those as examples, too.

### On Catalog Replication (i.e. definition of access control policies)

As a marketplace owner (called the *source*-marketplace, *source*) I want to set replication policies based on various criteria:

> JLA: “replication policies”: introduced here for the first time, this wording is only used once…
> 
> JLA: understanding the whole process as “replication”, but in the end there is a data-provider (the source) exchanging data (the offering/catalogue) with interested data-consumers (the sink), handout data to registered/unregistered (end-)users…

Specific marketplaces as a first, but we will consider also:

> JLA: "specific marketplaces": this means given offer is addressed to **ONE** (ore more) sink(s)?

- geographical
- domain
- time-based
- legal
- compliance

...depending on **source-marketplace requirements to control where my product offerings can be exposed** (called the *sink*-marketplace, *sink*).

Replication can apply to:

- single offerings
> JLA: low-hanging fruit: we start with a very single offering, *the* product-offering 
- entire catalogs

Replication policies (those are **access control** policies) are a **desiderata** from source marketplaces. No other marketplace is forced to publish if it does **NOT** agree.

In general the replication process involves two actors and two phases:

1. The source marketplace decides what to (ideally) replicate, where and under what conditions.
2. The sink marketplace becomes aware of such a replication wish and, if agreed, proceeds with the replication of the offering/catalog.

From a practical point of view, it was agreed that the process could work as follows:

1. The source marketplace publishes an offering. This will trigger a blockchain notification to all interested marketplaces (access nodes) who can access the endpoint of the offering/catalogue for retrieval. Through some kind of governance rules in DOME, we’ll agree that a successful retrieval of offering/catalogue also entitles replication on a sink marketplace.
2. At the same time, the source marketplace will define some usage (???: JLA: access vs. usage) control policies for that offering/catalogue (through the GUI, translated to ODRL and managed locally within the access node by local PDP, PEP).
3. When the sink marketplace tries to access the catalogue, the source marketplace will enforce the access control policies (through PDP/PEP). A successful retrieval means that replication is allowed.
4. It’s up to the sink marketplace to decide whether to expose the offering or not. However, if it agrees to publish, this should happen according to visibility policies (see below).

> JLA: “visibility policies”: these are the policies for usage control - given source expresses why and how given offer/catalogue could be provided on sink’s side to third party (“registered/unregister user”)

Note 1: being the above process entirely on the source side and assuming that a granted access means ‘replication allowed’, every marketplace in the federation is free to implement this as it wishes (or do not implement it at all). However the DOME central marketplace (i.e. the BAE) should implement it as we’re discussing and defining here.

Open issue: how to manage a change in the replication policy (in particular, any restriction of it) after a catalogue has been already replicated? Should the source emit an ‘offering changed’ event to force a re-retrieval of the content possibly denying the access?

### On Acceptance Policies

> TODO: to be clarified: JLA: this seems to be a special use case

As a DOME-Marketplace operator (thus, through the BAE) I can set acceptance policies based on criteria to control which offerings from other providers can be exposed on the DOME marketplace. Criteria can consider attributes of the source marketplace, e.g.:

- legal information
- certification schemes
- country
- domain of activity

as well of the catalogue/offering, e.g.:

- certifications
- type of the service
- category of the service

Any federated marketplace can manage this as it wishes, or decide not to filter any incoming request, or manage it by manual processes, no matter. However, the DOME central marketplace should include the following features:

- a GUI to express/browse/update acceptance policies (maybe in a simplified way)
- a low-level language to express acceptance policies.
- a filtering mechanism so that any offering available for replication (see above) is checked against such rules. Whenever rules are passed, the offering/catalogue becomes automatically visible on the DOME-Marketplace.

### On Usage Control Policies

> JLA: here the second switch **Visibility** Policies to **Usage Control** Policies

As a marketplace or product/service provider, I can set usage policies based on criteria, e.g.:
- customer properties
- > JLA: TBC@all: what are those *properties*? 

to control which customers (within federated marketplaces) can see my ("my": this is the *replication-source*!) offerings (on given *replication-sink*). Also, depending on some other criteria, e.g.:
- registered user
- unregistered user

as a seller:
- vendor
- distributor
- reseller

I want to set **usage control** policies on **specific offering metadata**, e.g.:
- price

Similar to catalog replication, but enforcement (of given Usage Control Policies) here can only be done on the sink marketplace. This means that the catalog/offering content should be made available entirely

> JLA: “this means”: given sink understands given usage control (exposed by source; a machine-readable policy; here: ODRL) and **MUST** enforce/evaluate nested policy-rules at runtime (depending on current customer (within federated marketplaces); registered/unregistered user

> JLA: “entirely”: what does this mean, more precise? The full information (here: offering) is still “filtered” by given Access Control (on source-side)
to the sink (the source can’t know in advance who will access the sink marketplace); then it’s up to the sink marketplace to

> JLA: 1) 2) : here we go: sink understands sources usage control and makes it to some sort of access control un sink-side >>>>>

1. evaluate if the offering has to be shown or not to the customer 
2. show only allowed offering metadata.

> JLA: “offering metadata”: what are these? Examples, etc. needed...

- metadata *this*
- metadata *that*
- metadata *those*
- metadata *these*

This also means that the visibility rules should be made available to the sink (can’t be enforced on the source as with replication) and must be understood by it (need for agreed format and semantics).

---

## References

---
