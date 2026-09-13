---
title: Marketing Campaign A/B Testing
description: Statistical analysis of Facebook and Google Ads campaigns to identify what actually drove conversion
tags: [Analytics, Statistics, Marketing]
headline: What actually drove conversion across Facebook and Google Ads, tested not guessed
coverImage: /images/projects/marketing-ab-testing.png
metrics:
  - "2 platforms tested"
  - "1,200+ campaign records"
  - "Hypothesis-driven approach"
github: https://github.com/sadatanjum/marketing-ab-testing
publishDate: "2025-11-20"
featured: true
---

## Context

A mid-sized e-commerce company was running parallel campaigns on Facebook and Google Ads, spending roughly equal budgets on each. The marketing team had intuitions about which platform and which creative types worked better, but no systematic evidence. Campaign performance varied week to week, and decisions about where to allocate budget were made by gut feel rather than data.

## The Question

**Which platform drives higher conversion rates, and does the answer change by creative type (image vs. video) or audience segment?**

The business needed to know whether to double down on one platform, whether creative investment (video production) was worth the cost, and whether different audience segments responded differently.

## The Data

**Source:** Campaign performance export from the company's ad management dashboard (aggregated daily-level data for 6 months).

**Volume:** ~1,200 campaign-day records across both platforms.

**Grain:** One row per campaign per day, showing impressions, clicks, conversions, and spend.

**What was wrong with it:**
1. **Inconsistent naming conventions** — campaigns were tagged inconsistently ("FB_Image_Q3", "Facebook-Image-Q3", "fb-img-q3") making it hard to group by platform or creative type.
2. **Missing conversion tracking** — some campaigns had zero conversions recorded not because they failed, but because tracking pixels weren't deployed correctly.
3. **Seasonal noise** — Black Friday and Eid campaigns dominated the dataset, making it hard to see baseline performance.
4. **Attribution ambiguity** — users often saw both Facebook and Google ads before converting, but each platform claimed 100% credit.

## Approach

Built a Python-based analysis pipeline using pandas, scipy, and matplotlib:

1. **Cleaned and standardized the data:**
   - Wrote regex patterns to extract platform, creative type, and audience segment from messy campaign names
   - Filtered out campaigns with broken tracking (zero impressions but non-zero spend, or campaigns shorter than 3 days)
   - Excluded Black Friday/Eid weeks to isolate baseline performance

2. **Calculated conversion rates and confidence intervals:**
   - Conversion rate = conversions / clicks
   - Used binomial proportion confidence intervals (Wilson score method) to account for small sample sizes
   - Segmented by platform, creative type, and audience

3. **Ran hypothesis tests:**
   - **H1:** Facebook vs. Google overall (two-proportion z-test)
   - **H2:** Image vs. video on each platform separately (chi-square test)
   - **H3:** Audience segment interaction (is there a segment where Facebook wins?)
   - Set alpha = 0.05 and applied Bonferroni correction for multiple comparisons

4. **What I rejected and why:**
   - **Regression modeling:** Tempting to build a multi-factor model, but the goal was a binary decision ("where should we spend?"), not a prediction engine. Simple tests answered the question faster.
   - **Last-click attribution model:** Would have required user-level journey data we didn't have. Worked with platform-reported conversions instead and flagged the attribution limitation in the report.

Here's the core hypothesis test (simplified):

```python
from scipy.stats import chi2_contingency
import numpy as np

def test_platform_difference(df):
    # Contingency table: [conversions, non-conversions] x [Facebook, Google]
    fb = df[df['platform'] == 'Facebook']
    google = df[df['platform'] == 'Google']
    
    fb_conversions = fb['conversions'].sum()
    fb_clicks = fb['clicks'].sum()
    
    google_conversions = google['conversions'].sum()
    google_clicks = google['clicks'].sum()
    
    table = np.array([
        [fb_conversions, fb_clicks - fb_conversions],
        [google_conversions, google_clicks - google_conversions]
    ])
    
    chi2, p_value, dof, expected = chi2_contingency(table)
    
    return {
        'chi2': chi2,
        'p_value': p_value,
        'fb_rate': fb_conversions / fb_clicks,
        'google_rate': google_conversions / google_clicks
    }
```

## What Changed

**Key findings:**
1. **Google Ads had a 1.8× higher conversion rate than Facebook** (3.2% vs. 1.8%, p < 0.001) — statistically significant and economically meaningful.
2. **Video creative outperformed image on both platforms**, but the lift was larger on Facebook (+65% vs. +25% on Google).
3. **No significant audience segment interaction** — Google won across all segments tested.

**Business impact:**
- The marketing team reallocated 60% of budget to Google Ads in the following quarter.
- Video production budget was increased, with priority given to Facebook campaigns where the video lift was strongest.
- The company saved an estimated 15-20% in wasted spend by cutting underperforming Facebook image campaigns.

**One honest limitation:** This analysis looked at conversion rates, not ROI. Google's higher conversion rate came at a higher cost per click, so the final profitability comparison required a separate cost analysis (which I also delivered, but kept out of this case study for brevity).

## Artefacts

- **GitHub:** [Marketing Campaign A/B Testing Repository](https://github.com/sadatanjum/marketing-ab-testing) — includes the Python analysis script, anonymized sample data, and Jupyter notebook with visualizations
- **Deliverables:**
  - Executive summary deck (PDF)
  - Statistical test results table
  - Segmented conversion rate charts
  - Recommendation memo

*Note: All campaign data has been anonymized. Company name and specific spend figures are not disclosed.*