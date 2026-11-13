/*
  Project data for the portfolio.
  To add or change a project, edit this list. Each entry needs:
  id, title, subtitle, tags, chips, tint, summary, question, did, findings,
  stack, repo, images (first image is the main one) and tile (card preview).
  Images live in assets/img/projects/<id>/ and scenes in assets/img/scenes/.
*/
window.PROJECTS = [
  {
    id: 'trailwave',
    title: 'Trailwave Freight',
    subtitle: 'Why most orders arrive late, and what to fix first',
    tags: ['Business intelligence', 'PostgreSQL · Python · Power BI'],
    chips: [
      { value: '180K', label: 'order items' },
      { value: '42.7%', label: 'on time' }
    ],
    tint: '109, 91, 208',
    summary:
      'A five-page Power BI report for Trailwave Freight, a fictional logistics company, built on 180,519 order items from the DataCo supply chain dataset (2015 to 2018). A Python notebook loads the raw CSV into a PostgreSQL star schema, SQL checks the numbers, and the report answers one question: where does the business win, and where does it lose?',
    question: 'Is the business healthy, do orders arrive when we promise, and what is the first thing worth fixing?',
    did: [
      'Loaded the raw CSV into PostgreSQL with a Python notebook that checks its own output: row counts, keys and totals against the source.',
      'Modelled a star schema with one fact table and five dimensions, and wrote 40 DAX measures, with delivery measures counted per order instead of per row.',
      'Wrote 14 business questions in SQL, plus a script that recalculates the report numbers so the DAX can be checked against SQL.',
      'Built a what-if page: pick an on-time target for First Class and see the late orders avoided and the new overall on-time rate.'
    ],
    findings: [
      { value: '42.7%', text: 'of orders arrive within the promised days. Late orders are 1.62 days late on average.' },
      { value: '100%', text: 'of First Class orders are late. It promises 1 day and takes 2. Standard Class is late on 39.8%.' },
      { value: '57.2-57.7%', text: 'late rate in every customer segment. Customers, regions and categories do not explain the delays.' },
      { value: '51.8%', text: 'overall on-time rate if First Class matched Standard Class. That is 5,761 late orders avoided.' }
    ],
    stack: ['PostgreSQL', 'Python', 'pandas', 'SQL', 'Power BI', 'DAX'],
    repo: 'https://github.com/JoaoFelicissimo03/Trailwave-Freight-BI-Project',
    tile: 'assets/img/projects/trailwave/tile.webp',
    images: [
      { src: 'assets/img/projects/trailwave/overview.webp', w: 1280, h: 720, caption: 'Overview', alt: 'Overview page of the Trailwave Freight report with orders, revenue, profit and on-time rate' },
      { src: 'assets/img/projects/trailwave/deliveries.webp', w: 1280, h: 720, caption: 'Deliveries', alt: 'Deliveries page comparing promised and real delivery days by shipping mode' },
      { src: 'assets/img/projects/trailwave/hotspots.webp', w: 1280, h: 720, caption: 'Hotspots', alt: 'Hotspots page with on-time rate by region and shipping mode and a map of late rate by country' },
      { src: 'assets/img/projects/trailwave/money.webp', w: 1280, h: 720, caption: 'Money', alt: 'Money page with profit by category and margin by market' },
      { src: 'assets/img/projects/trailwave/action.webp', w: 1280, h: 720, caption: 'Action', alt: 'Action page with a what-if target for First Class on-time delivery' },
      { src: 'assets/img/projects/trailwave/data-model.webp', w: 1800, h: 874, caption: 'Data model', alt: 'Star schema of the Trailwave Freight Power BI model' }
    ]
  },
  {
    id: 'terrabiotic',
    title: 'TerraBiotic',
    subtitle: 'Sales fell while volume grew. A report that explains why.',
    tags: ['Business intelligence', 'Power BI · DAX'],
    chips: [
      { value: '-3.8%', label: 'sales in 2023' },
      { value: '50', label: 'countries' }
    ],
    tint: '58, 174, 126',
    summary:
      'A Power BI report for TerraBiotic, a fictional plant distributor that sells to business customers in 50 countries. It compares each year with the same period of the year before and explains the result in plain words: what changed, why it changed, where it happened and who drove it.',
    question: 'Why did sales change? Was it volume or price, when did it happen, and how much do we depend on our largest market?',
    did: [
      'Cleaned the source workbook in Power Query, with the file path in a parameter, and built a star schema with a DAX calendar table.',
      'Wrote time intelligence measures that compare a partial year with the same days of the year before, not with the full year.',
      'Split the change in sales into a volume effect and a price effect, shown as a price-volume bridge that adds up exactly.',
      'Added a headline and summary written by DAX, a country drill-through, a customer drill-through and a map tooltip.'
    ],
    findings: [
      { value: '-3.8%', text: 'sales in 2023 ($13.00M), while units sold rose 3.2%. The average price per unit fell 6.7%.' },
      { value: '-$940K', text: 'from lower prices, against +$428K from higher volume. Price, not volume, explains the drop.' },
      { value: '31%', text: 'of sales come from China, which fell 15.9%. Without China, sales grew 2.8%.' },
      { value: '57.1%', text: 'of sales come from the top 5 countries. Asia outside China is the clearest room to grow.' }
    ],
    stack: ['Power BI', 'DAX', 'Power Query', 'Data modelling'],
    repo: 'https://github.com/JoaoFelicissimo03/TerraBiotic_PowerBI_Project',
    tile: 'assets/img/projects/terrabiotic/tile.webp',
    images: [
      { src: 'assets/img/projects/terrabiotic/dashboard.webp', w: 1424, h: 800, caption: 'Main page', alt: 'TerraBiotic main report page with KPI cards, price-volume bridge, waterfall, map and customer scatter' },
      { src: 'assets/img/projects/terrabiotic/country-detail.webp', w: 1424, h: 800, caption: 'Country detail', alt: 'Country detail drill-through page for China' },
      { src: 'assets/img/projects/terrabiotic/customer-orders.webp', w: 1424, h: 800, caption: 'Customer orders', alt: 'Customer orders drill-through page with the full order history of one customer' },
      { src: 'assets/img/projects/terrabiotic/data-model.webp', w: 890, h: 659, caption: 'Data model', alt: 'Star schema of the TerraBiotic Power BI model' }
    ]
  },
  {
    id: 'energy',
    title: 'Energy Transition Portugal',
    subtitle: 'How green is Portugal’s electricity, what does it cost, and where are electric cars charged?',
    tags: ['Data pipeline', 'Python · Streamlit'],
    chips: [
      { value: '88.7%', label: 'renewable in 2024' },
      { value: 'EN · PT', label: 'dashboard' }
    ],
    tint: '217, 104, 58',
    summary:
      'A Python pipeline that pulls public data from the grid operator (REN), the distribution network operator (E-REDES) and Statistics Portugal (INE), and a Streamlit dashboard that reads like a short story: five chapters and a bonus, in English and Portuguese. Every run moves a five-year window forward to yesterday, and every sentence on the dashboard is written from the data.',
    question: 'How much of Portugal’s electricity is renewable, do renewables push prices down, and where is electric vehicle charging concentrated?',
    did: [
      'Built an incremental extraction from three public APIs that only asks for the days it does not have yet and retries gaps.',
      'Turned 15-minute power readings into daily energy tables and cross-checked market prices against the official monthly report.',
      'Compared five forecasting models over 18 test windows of 60 days, instead of trusting a single test period.',
      'Built a bilingual Streamlit dashboard with Plotly, where titles and sentences change with the filters, and tested every page with pytest.'
    ],
    findings: [
      { value: '88.7%', text: 'of domestic production was renewable in 2024, up from 62.3% in 2022, a weak year for hydro.' },
      { value: '2.4×', text: 'more average daily solar output in 2025 than in 2022.' },
      { value: '-0.3 to -0.75', text: 'correlation between the daily renewable share and the price, inside each year. Greener days are cheaper days.' },
      { value: '37.1%', text: 'of mainland electric vehicle charging happens in Lisbon district. Porto district adds 15.9%.' }
    ],
    stack: ['Python', 'pandas', 'REST APIs', 'scikit-learn', 'Streamlit', 'Plotly', 'pytest'],
    repo: 'https://github.com/JoaoFelicissimo03/PT-Energy-Transition-Analytics',
    tile: 'assets/img/projects/energy/tile.webp',
    images: [
      { src: 'assets/img/projects/energy/where-we-are.webp', w: 1200, h: 1404, caption: 'Where we are', alt: 'Chapter 1 of the dashboard: the current renewable share of electricity in Portugal' },
      { src: 'assets/img/projects/energy/how-we-got-here.webp', w: 1200, h: 1341, caption: 'How we got here', alt: 'Chapter 2: how the electricity mix changed since 2021' },
      { src: 'assets/img/projects/energy/what-it-costs.webp', w: 1200, h: 1423, caption: 'What it costs', alt: 'Chapter 3: wholesale electricity prices in Portugal and Spain' },
      { src: 'assets/img/projects/energy/where-it-is-used.webp', w: 1200, h: 1498, caption: 'Where it is used', alt: 'Chapter 4: electric vehicle charging by municipality' },
      { src: 'assets/img/projects/energy/what-comes-next.webp', w: 1200, h: 1553, caption: 'What comes next', alt: 'Chapter 5: forecasting tomorrow’s renewable share' },
      { src: 'assets/img/projects/energy/bonus-2025-blackout.webp', w: 1200, h: 1660, caption: 'The 2025 blackout', alt: 'Bonus chapter: the electricity mix after the blackout of 28 April 2025' }
    ]
  },
  {
    id: 'instacart',
    title: 'Instacart Market Analysis',
    subtitle: 'Does the first order say anything about how long a customer keeps ordering?',
    tags: ['SQL analysis', 'PostgreSQL'],
    chips: [
      { value: '3.4M', label: 'orders' },
      { value: '206K', label: 'users' }
    ],
    tint: '108, 185, 106',
    summary:
      'An SQL analysis of 3.4 million grocery orders from 206,209 users in PostgreSQL. It starts from the raw CSV files, builds a database with keys, indexes and data quality checks, and looks at the first order from four angles: basket size, products, product pairs and the time until the next order.',
    question: 'What does a user buy in the first order, and does it relate to how many orders they place and how quickly they come back?',
    did: [
      'Loaded 37 million rows with bulk COPY, added primary and foreign keys after the load and ran 11 data quality checks. All pass.',
      'Grouped users by the size of their first basket and measured how many reach 10, 20 and 50 orders.',
      'Built an adjusted lift, so a product is not rewarded only for showing up in big baskets.',
      'Ranked product pairs by the lower end of a 95% Wilson interval, calculated in SQL, so lucky pairs do not top the list.'
    ],
    findings: [
      { value: '29.5% vs 22.8%', text: 'of users reach 20+ orders when the first basket has 16+ items, against 1 to 5 items.' },
      { value: '23 of 25', text: 'products with the highest adjusted lift are produce or dairy, and 18 of them are organic.' },
      { value: '23.2%', text: 'of users wait 30 days or more for the second order. It is the slowest step.' }
    ],
    stack: ['PostgreSQL', 'SQL', 'CTEs', 'Window functions', 'Materialized views'],
    repo: 'https://github.com/JoaoFelicissimo03/Instacart_Market_Analysis',
    tile: 'assets/img/projects/instacart/tile.webp',
    images: [
      { src: 'assets/img/projects/instacart/01-first-basket-cohorts.webp', w: 1800, h: 720, caption: 'First basket cohorts', alt: 'Share of users reaching 10, 20 and 50 orders by size of the first basket' },
      { src: 'assets/img/projects/instacart/02-department-adjusted-lift.webp', w: 1800, h: 1251, caption: 'Adjusted lift', alt: 'Adjusted lift by department in the first basket' },
      { src: 'assets/img/projects/instacart/03-baby-food-pairs.webp', w: 1800, h: 1211, caption: 'Product pairs', alt: 'Baby food product pairs with the highest loyalty, with confidence intervals' },
      { src: 'assets/img/projects/instacart/04-time-to-second-order.webp', w: 1800, h: 767, caption: 'Time to second order', alt: 'Time between the first and the second order by size of the first basket' },
      { src: 'assets/img/projects/instacart/instacart-schema.webp', w: 1478, h: 797, caption: 'Schema', alt: 'Database schema of the Instacart dataset' }
    ]
  },
  {
    id: 'oakbrew',
    title: 'Oak Brew',
    subtitle: 'Where a small coffee retailer makes its money, on one Excel page',
    tags: ['Spreadsheet analysis', 'Excel'],
    chips: [
      { value: '$45K', label: 'sales' },
      { value: '957', label: 'orders' }
    ],
    tint: '204, 149, 96',
    summary:
      'An interactive Excel dashboard for Oak Brew, a fictional coffee retailer selling in the United States, Ireland and the United Kingdom. Three raw tables become one clean sales table, and a single page shows where the money comes from and what to do next.',
    question: 'Where does Oak Brew make its money, and what should it do next?',
    did: [
      'Joined the tables with XLOOKUP and a two-way INDEX MATCH that is written once and copied across four columns.',
      'Counted real orders with a running COUNTIF flag: 957 orders, not 1,000 rows.',
      'Built six PivotTables from one Excel Table, with KPI cards that read the numbers through GETPIVOTDATA.',
      'Connected a timeline and three slicers to every chart, so one click updates the whole page.'
    ],
    findings: [
      { value: '10.0%', text: 'margin on $45,134 in sales from 957 orders. The United States brings in 79%.' },
      { value: '35%', text: 'of profit comes from Liberica, with only 27% of sales. Robusta is the opposite.' },
      { value: '$45.08 vs $49.12', text: 'average order for loyalty card holders against other customers. The card is not driving extra spend.' }
    ],
    stack: ['Excel', 'XLOOKUP', 'INDEX MATCH', 'PivotTables', 'Slicers'],
    repo: 'https://github.com/JoaoFelicissimo03/Oak-Brew-Excel-Project',
    tile: 'assets/img/projects/oakbrew/tile.webp',
    images: [
      { src: 'assets/img/projects/oakbrew/dashboard.webp', w: 1260, h: 714, caption: 'Dashboard', alt: 'Oak Brew coffee sales dashboard in Excel with KPI cards, charts, slicers and takeaways' }
    ]
  }
];
