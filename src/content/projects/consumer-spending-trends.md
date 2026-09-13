---
title: Consumer Spending Trends
description: Market intelligence dashboard compiling consumer behaviour patterns from publicly available economic data
tags: [Research, Visualisation, Economics]
headline: Consumer behaviour patterns compiled into a market-intelligence dashboard
coverImage: /images/projects/consumer-spending.png
metrics:
  - "5 years of data"
  - "12 spending categories"
  - "Interactive dashboard"
github: https://github.com/sadatanjum/consumer-spending-trends
publishDate: "2025-08-10"
featured: true
---

## Context

A research project for a university assignment that grew into a reusable dashboard. The original brief was to analyze household spending patterns in Bangladesh, but the available data was scattered across World Bank, Bangladesh Bureau of Statistics (BBS), and academic papers — none of it in a form that could be visualized or compared easily.

## The Question

**How has household spending in Bangladesh shifted across categories (food, housing, education, healthcare, recreation) over the past 5 years, and how does this compare to similar economies in South Asia?**

The goal was to produce a dashboard that an economist, journalist, or policy researcher could use to explore the data without writing queries.

## The Data

**Sources:**
- World Bank World Development Indicators (WDI) — household consumption expenditure by category
- Bangladesh Bureau of Statistics (BBS) — Household Income and Expenditure Survey (HIES)
- IMF World Economic Outlook — GDP per capita and inflation

**Volume:** ~2,400 records (5 years × 12 spending categories × 40 countries).

**Grain:** One row per country per year per spending category.

**What was wrong with it:**
1. **Inconsistent category definitions** — World Bank used "food and beverages" while BBS split "food" and "beverages" separately. Required a mapping table.
2. **Missing years** — BBS HIES is conducted every 5 years, so 2021-2024 had to be interpolated or marked as estimates.
3. **Currency and inflation** — all figures needed to be converted to constant 2020 USD to make year-over-year comparisons valid.
4. **Population vs. per-household** — some sources reported per-capita, others per-household. Needed to choose one and convert.

## Approach

Built a Python ETL pipeline + Tableau dashboard:

1. **Extracted and standardized:**
   - Wrote a script to pull WDI data via World Bank API (avoided manual CSV downloads)
   - Built a mapping table to align BBS and World Bank categories
   - Converted all figures to constant 2020 USD using IMF inflation data
   - Interpolated missing BBS years using linear interpolation, with a flag so users could distinguish estimates from actuals

2. **Designed the dashboard around three questions:**
   - **Trend:** How has each category's share of total spending changed over time? (line charts)
   - **Comparison:** How does Bangladesh compare to India, Pakistan, Sri Lanka, and Nepal? (bar charts + small multiples)
   - **Composition:** What's the current mix of household spending? (stacked area)

3. **What I rejected and why:**
   - **Power BI:** Tableau's public sharing was simpler for a student project, and I already knew Tableau well.
   - **Machine learning forecasting:** The interpolation already introduced uncertainty; adding a forecast would have compounded it. Better to show the interpolation clearly and let users draw their own conclusions.
   - **Interactive filters for every dimension:** Tempting, but it would have made the dashboard unusable. Settled on 3 core views with 2-3 filters each.

Here's the interpolation function (simplified):

```python
def interpolate_missing_years(df, year_col='year', value_col='spend_usd'):
    """Linear interpolation for missing years, with a flag for estimates."""
    df = df.sort_values(year_col)
    
    # Create a complete year range
    years = range(df[year_col].min(), df[year_col].max() + 1)
    df_complete = df.set_index(year_col).reindex(years)
    
    # Interpolate
    df_complete[value_col] = df_complete[value_col].interpolate(method='linear')
    
    # Flag interpolated values
    df_complete['is_estimate'] = df_complete[value_col].isna() == False
    df_complete.loc[df.index, 'is_estimate'] = False
    
    return df_complete.reset_index()
```

## What Changed

**For the assignment:**
- Received an A+ and was asked to present the dashboard to the class as an example of "data storytelling."
- The interpolation methodology (and its limitations) became a discussion point in the seminar.

**Reusable asset:**
- The dashboard is publicly available on Tableau Public and has been viewed 200+ times.
- The ETL script can be re-run with new data as BBS and World Bank update their figures.
- The interpolation approach (with explicit flagging of estimates) is a pattern I now use in other projects.

**One honest limitation:** The interpolation assumes linear change between HIES years, which is almost certainly wrong for volatile categories like food (which spiked during COVID). The dashboard flags interpolated years, but a more sophisticated approach (e.g., using quarterly CPI as a proxy) would be more accurate.

## Artefacts

- **GitHub:** [Consumer Spending Trends Repository](https://github.com/sadatanjum/consumer-spending-trends) — includes the Python ETL script, category mapping table, and Tableau workbook
- **Live dashboard:** [Tableau Public](https://public.tableau.com/app/profile/zulqarnain.anjum)
- **Screenshots:**
  - Trend view (spending shares over time)
  - Comparison view (Bangladesh vs. South Asia)
  - Composition view (current mix)

*Note: All data is from publicly available sources. No proprietary or confidential information is included.*