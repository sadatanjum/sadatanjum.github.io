---
title: Hub Transport Dashboard
description: Real-time operational intelligence for 20+ distribution hubs with automated SLA tracking and daily reporting
tags: [Logistics, Dashboards, Analytics]
headline: Real-time performance across 20+ distribution hubs with 3-tier SLA tracking
coverImage: /images/projects/hub-dashboard.png
metrics: 
  - "20+ hubs monitored"
  - "3-tier SLA tracking"
  - "Significant reduction in manual reporting time"
github: https://github.com/sadatanjum/hub-transport-dashboard
publishDate: "2026-05-15"
featured: true
---

## Context

CarryBee Express runs last-mile logistics across 20+ distribution hubs in Bangladesh. Before this dashboard, operations managers pulled hub performance data by hand every morning — downloading CSV exports, reconciling timestamps across systems, and manually calculating which hubs were at risk of breaching their service-level agreements. The process took 90+ minutes daily and the answers were already stale by the time they reached the team.

## The Question

**Which hubs are at risk of breaching SLA today, and can we see it before the breach rather than after?**

The business needed a system that could answer this continuously, not once per morning, and that separated "we're behind schedule" (fixable) from "we've already missed the window" (damage control).

## The Data

**Sources:**
- Hub operations log (Google Sheets, updated hourly via Apps Script webhooks)
- Parcel tracking events (BigQuery export from the internal TMS)
- Hub roster and capacity data (static reference table)

**Volume:** ~15,000 active parcels across the network on an average day, ~50 status-change events per hub per hour.

**Grain:** One row per parcel per status transition (In Transit → Hub Received → Out for Delivery → Delivered).

**What was wrong with it:**
1. Timestamps were recorded in local hub time with no timezone metadata — reconciling Dhaka, Chattogram, and Sylhet required manual offset corrections.
2. The operations log's "last updated" column showed when the Google Sheet recalculated, not when the parcel event actually occurred.
3. Hub IDs were inconsistent between systems — "DH-01", "Dhaka-01", and "Dhaka Hub 1" all referred to the same location.
4. Weekend and holiday exceptions weren't flagged, so the SLA clock kept running when hubs were closed.

## Approach

Built a Google Apps Script + Looker Studio pipeline that:

1. **Normalized the data.** Wrote an ETL script (Apps Script, runs every 30 minutes) that:
   - Pulled fresh data from both sources
   - Standardized hub IDs using a lookup table
   - Converted all timestamps to UTC, then back to Dhaka time for display
   - Joined parcel events with hub metadata

2. **Calculated aging in three tiers** (matching CarryBee's SLA definitions):
   - **Overall aging:** total time since parcel entered the network
   - **1st Attempt aging:** time since first delivery attempt
   - **LMH (Last Mile Hub) aging:** time since arrival at the final-mile hub

   Each tier had its own threshold; the dashboard flagged parcels exceeding any of them.

3. **Pre-aggregated the metrics** rather than letting Looker Studio calculate them live — turned 15,000 rows into ~25 hub-level summary rows. This made the dashboard load in under 2 seconds instead of timing out.

4. **What I rejected and why:**
   - **Live BigQuery connection to Looker Studio:** Too slow for morning stand-ups. The query took 8+ seconds and often timed out when the whole team opened the dashboard at once.
   - **Nightly batch only:** Defeats the purpose — we needed to catch breaches during the day, not discover them the next morning.
   - **Building a custom web app:** Scope creep. Looker Studio gave us drill-downs, filters, and mobile access for free; rebuilding those features would have taken weeks.

Here's the core aging calculation (simplified):

```javascript
function calculateAging(parcelEvents, hubMetadata) {
  const now = new Date();
  const aging = [];
  
  for (const parcel of parcelEvents) {
    const hubEntry = parcel.timestamps.find(t => t.event === 'HUB_RECEIVED');
    const firstAttempt = parcel.timestamps.find(t => t.event === 'DELIVERY_ATTEMPTED');
    
    if (!hubEntry) continue; // Parcel not yet at hub
    
    const overallHours = (now - new Date(hubEntry.timestamp)) / (1000 * 60 * 60);
    const firstAttemptHours = firstAttempt 
      ? (now - new Date(firstAttempt.timestamp)) / (1000 * 60 * 60)
      : 0;
    
    aging.push({
      parcelId: parcel.id,
      hubId: parcel.currentHub,
      overallAging: overallHours,
      firstAttemptAging: firstAttemptHours,
      breached: overallHours > 48 || firstAttemptHours > 24
    });
  }
  
  return aging;
}
```

## What Changed

**Operationally:**
- Morning reporting time dropped significantly — the dashboard loaded with fresh data when managers opened it, no manual pulls needed.
- Hub managers now get a daily automated email (via Apps Script trigger) listing their at-risk parcels before the breach window closes.
- The ops team escalates exceptions during the day rather than discovering them in post-mortems.

**One honest limitation:** The dashboard shows *what* is late, not *why*. Root-cause analysis (weather, rider unavailability, address issues) still happens manually, but now we're investigating 20 parcels instead of guessing from 15,000.

**Figures indexed; hub names anonymized per employer confidentiality.**

## Artefacts

- **GitHub:** [Hub Transport Dashboard Repository](https://github.com/sadatanjum/hub-transport-dashboard) — includes the Apps Script ETL pipeline and anonymized sample data
- **Screenshots:**
  - Dashboard overview (hub-level SLA compliance)
  - Parcel aging drill-down
  - Daily email alert template
  - Mobile view

*Note: The live dashboard is internal to CarryBee and cannot be shared publicly. Screenshots show structure and methodology with anonymized data.*