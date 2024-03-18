import { performanceItems } from './items';

export default function () {
  return {
    serverSidePagination: true,
    currentPage: 1,
    pageCount: 1,
    items: [],
    pageSize: 10,
    loading: false,
    preloader: true,
    tableModel: {
      selectedRows: [],
      displayColumns: [],
      columnsOrder: [],
    },
    table: {
      fields: [
        {
          item: {
            key: "traffic_source_campaign_id",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Camp. ID",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "additional_fields.budget",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Budget",
            info:
              "The current budget of the item as reported by the traffic source",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "additional_fields.bid",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Bid",
            info:
              "The amount you are paying based on the bidding model (CPC, CPM, CPA etc)",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "name",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Name",
            info: "The name of the item as reported from the traffic source.",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "status",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Status",
            info:
              "he current status of the item. Status can be Running or Paused",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "payout",
            sortable: false,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Payout",
            info:
              "If you have not entered a payout manually for a given campaign, then the payout will be calculated as Payout = Revenue/Conversions.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "cost",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Amount Spent",
            info:
              "The amount an item spent in the selected period, as reported by the traffic source",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "avg_cpc",
            sortable: true,
            filter: true,
            temporary: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Avg. CPC",
            info:
              "Average CPC is calculated as: Avg. CPC = Cost/Traffic Source Clicks",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_conversions",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR Conv.",
            info:
              ' {             "default": {                 "text": "The number of conversion events reported by the tracking platform. Note: this does not include custom conversions, only the main conversion event."             }         }',
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR Rev.",
            info:
              '  {             "default": {                 "text": "The generated revenue as reported by the tracking platform. NOTE: this does not include revenues from custom conversions. It only includes the main Revenue column of your tracker."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_net",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR NET",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "tr_net=tr_revenue-cost",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated net profit based on the Amount Spent reported by the traffic source and the Revenue (Tracker) reported by the tracking platform."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "color",
          },
          display: true,
        },
        {
          item: {
            key: "tr_roi",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR ROI",
            info:
              "TR ROI is calculated using revenue from tracker and costs from traffic source",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_epc",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR EPC",
            info:
              "TR EPC Is calculated using only tracker data: (Tracker Revenue)/(Tracker Clicks)",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "epc",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "EPC",
            info:
              "TR EPC Is calculated using only tracker data: (Tracker Revenue)/(Tracker Clicks)",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "ts_clicks_comperable",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Clicks Previous",
            info: "The number of clicks as reported by the traffic source.",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          colClass: 'comperable',
          display: true,
        },
        {
          item: {
            key: "ts_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Clicks",
            info: "The number of clicks as reported by the traffic source.",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          colClass: 'comperable',
          display: true,
        },
        {
          item: {
            key: "tr_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR Clicks",
            info:
              "Tracker Clicks  are clicks that we get from your connected tracking platform",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
          },
          display: true,
        },
        {
          item: {
            key: "lp_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "LP Clicks",
            info:
              ' {             "default": {                 "text": "The amount of visitors which clicked on a call-to-action link inside your landing page (click to an offer link), as reported by the tracking platform."             }         }',
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "lp_ctr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "LP CTR",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "lp_ctr=lp_clicks/tr_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}; The calculated landing page click-through rate percentage, based on landing page clicks and total clicks reported by the tracking platform."             }         }',
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "ctr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Ctr",
            info:
              "Ctr = Clicks/Impressions. CTR is calculated by dividing the number of clicks by the number of impressions, as reported by the traffic source, for your campaigns and campaign items.",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "click_loss",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Click Loss",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "click_loss=ts_clicks - tr_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The difference between clicks reported by your traffic source and clicks reported by your tracking platform. Some times, for various reasons, your tracking platform may report less or more clicks than what your ad network is reporting."             }         }',
            infoType: "popover",
          },
          display: true,
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            key: "tr_cvr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TR CVR",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "tr_cvr=tr_conversions/tr_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}} The calculated conversion rate based on the number of clicks and conversions reported by the tracking platform"             }         }',
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "ecpm",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "eCPM",
            info: "eCPM = (Cost/Impression)*1000",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "lp_cr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "LP CR",
            info: "Landing Page Conversion Rate= (TR Conversions/ LP Clicks)*100",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "cp_lp_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "LP CPC",
            info: "Cost per LP Click",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "ts_net",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "TS NET",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_net=ts_revenue-cost",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated net profit based on the ad spend and revenue reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "color",
          },
          display: true,
        },
        {
          item: {
            key: "ts_roi",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "TS ROI",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_roi=(ts_revenue-cost)/cost",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated return on investment based on the ad spend and revenue reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "color",
          },
          display: true,
        },
        {
          item: {
            filter: true,
            key: "customConversions1",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "CC TEST",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue1",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "CC TEST Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions2",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "App Install",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue2",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "App Install Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions3",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Unistall",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue3",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Unistall Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions4",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Add to Cart",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue4",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Add to Cart Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions5",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Purchase",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue5",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Purchase Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions6",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Lead",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue6",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Lead Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions7",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Bot Hits",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue7",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Bot Hits Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions8",
            sortable: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Pending Sale",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue8",
            sortable: true,
            enabledComparison: false,
          },
          header: {
            content: "Pending Sale Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "tr_cpa",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "TR CPA",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "tr_cpa=cost/tr_conversions",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}} The calculated cost per action, based on the number of conversions reported by the tracking platform and the amount spent reported by the traffic source."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "impressions",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Impressions",
            info:
              "The total number of impressions as reported by the traffic source. Each time your campaign item is displayed, it’s counted as one impression.",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "ts_conversions",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Conversions",
            info: "The number of conversions as reported by the traffic source.",
            infoType: "popover",
          },
          display: false,
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
        },
        {
          item: {
            key: "ts_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Revenue",
            info: "The generated revenue reported from the traffic source",
            infoType: "popover",
          },
          display: false,
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
        },
        {
          item: {
            key: "ts_cpa",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "TS CPA",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_cpa=cost/ts_conversions",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated cost per action based on the ad spend and the number of conversions reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          display: false,
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            key: "ts_epc",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "TS Epc",
            info:
              "TS Epc = Revenue/Clicks. Traffic Source Epc is calculated by dividing the revenue by the number of clicks, as reported by the traffic source, for your campaigns and campaign items items.",
            infoType: "popover",
          },
          display: false,
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            key: "ts_cvr",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "TS CVR",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_cvr=ts_conversions/ts_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated conversion rate based on the ad clicks and the number of conversions reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          display: false,
          options: {
            format: "percentage",
            precision: 2,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "customConversions9",
            sortable: true,
            enabledComparison: false,
          },
          header: {
            content: "Search",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue9",
            sortable: true,
            enabledComparison: false,
          },
          header: {
            content: "Search Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "publisher_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Search Feed Revenue",
            info: "Revenue reported by your search feed provider",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "publisher_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Search Feed Clicks",
            info: "Clicks reported by your search feed provider",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "publisher_conversions",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Search Feed Conversions",
            info: "Conversions reported by your search feed provider",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          header: {
            content: "Assertive Yield Test",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"1 + cost","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_1",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 0,
            style: "",
          },
          customMetric: "1 + cost",
          display: true,
        },
        {
          header: {
            content: "Custom_metric_2",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"( impressions + 3 )","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_2",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 0,
            style: "",
          },
          customMetric: "( impressions + 3 )",
          display: false,
        },
        {
          header: {
            content: "Test publisher clicks",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_clicks * 2","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_3",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 0,
            style: "",
          },
          customMetric: "publisher_clicks * 2",
          display: false,
        },
        {
          header: {
            content: "Test publisher revenue",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_revenue + ts_revenue + tr_revenue","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_4",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          customMetric: "publisher_revenue + ts_revenue + tr_revenue",
          display: false,
        },
        {
          header: {
            content: "Custom EPV",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"tr_revenue / 2","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_5",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "tr_revenue / 2",
          display: false,
        },
        {
          header: {
            content: "Test bpicori",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"2 + impressions + tr_conversions","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_6",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "2 + impressions + tr_conversions",
          display: true,
        },
        {
          header: {
            content: "CTR*CPC",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"ctr * 1 + 22 / ( 0 - 1 )","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_7",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "ctr * 1 + 22 / ( 0 - 1 )",
          display: false,
        },
        {
          header: {
            content: "test fb",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"impressions + ts_clicks","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_8",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "impressions + ts_clicks",
          display: true,
        },
        {
          header: {
            content: "Custom_metric_9",
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_9",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "publisher_revenue / publisher_clicks",
          display: false,
        },
        {
          header: {
            content: "Custom Metric 10",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"ctr + 50","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_10",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "color",
          },
          customMetric: "ctr + 50",
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions10",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "phonecall1",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue10",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "phonecall1 Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions11",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "abc",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue11",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "abc Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "v_ctr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Viewable Ctr",
            info:
              "Viewable CTR = Clicks/Viewable Impressions. Viewable CTR is calculated by dividing the number of clicks for your campaign items by the number of viewable impressions for your campaign items.",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "viewable_impressions",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Viewable Impressions",
            info:
              "The total number of viewable impressions as reported by the traffic source.  Each time your campaign item is on the screen for 1 second, it’s counted as one impression.",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "traffic_source_unique_name",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Traffic Source",
            infoType: "popover",
          },
          display: false,
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "est_cost",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Estimated Spent",
            info:
              "[Est. Spent] = [Avg. Cpc]  [Clicks (Tracker)]; NOTE: Estimated Spend is only available if you have connected a tracking platform.  To make up for the delay some traffic sources have in reporting the accurate spend for the day, we try to estimate its value using the average Cpc and multiplying it by the amount of clicks reported by your trackign platform, Clicks (Tracker).",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "est_net",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Est. Net",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "est_net=ts_revenue-est_cost",                         "type": "FORMULA"                     }                 },                 "text": "Because Taboola stats are delayed, we calculate an estimated net as: {{formula}}"             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "color",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "est_roi",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Est. Roi",
            info:
              "Because Taboola stats are delayed, we calculate an estimated ROI as: Est. ROI = Est. Net / Est. Cost",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "color",
          },
          display: false,
        },
      ],
      fields2: [
        {
          item: {
            filter: true,
            key: "customConversions1",
            sortable: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "arb_rev",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue1",
            sortable: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "arb_rev Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "name",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Name",
            info: "The name of the item as reported from the traffic source.",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "status",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Status",
            info:
              "The current status of the item. Status can be Running or Paused",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "additional_fields.daily_budget",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Budget",
            info: "The spending limit of your campaign.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_lead_action",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Leads",
            info: "Leads reported by Facebook",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "cost",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Amount Spent",
            info:
              "The ad spend amount as reported by the traffic source (ad network).",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "publisher_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Search Feed Revenue",
            info: "Revenue reported by your search feed provider",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_net",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Net (Tracker)",
            info:
              "[Net (Tracker)] = [Revenue (Tracker)] - [Amount Spent]; The calculated net profit based on the Amount Spent reported by the traffic source and the Revenue (Tracker) reported by the tracking platform.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "color",
          },
          display: true,
        },
        {
          item: {
            key: "tr_roi",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Roi (Tracker)",
            info:
              "[Roi (Tracker)] = ( [Net (Tracker)] / [Amount Spent] ) x 100; The calculated return on investment based on the Amount Spend reported by the traffic source, and Revenue (Tracker) reported by the tracking platform.",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "color",
          },
          display: true,
        },
        {
          item: {
            key: "publisher_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Search Feed Clicks",
            info: "Clicks reported by your search feed provider",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_reach",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Reach",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "TS Clicks",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "ctr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Ctr",
            info:
              "Ctr = Clicks/Impressions. CTR is calculated by dividing the number of clicks by the number of impressions, as reported by the traffic source, for your campaigns and campaign items.",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_comment_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Comments",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_impressions",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Ad. Impressions",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_inline_link_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Inline Link Clicks",
            info: "Inline link clicks on you Ad",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_like_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Likes",
            info: "Likes on your Ad",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "ROAS",
            info: "Return on Ad spending reported by Facebook",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_link_click_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "Link clicks",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_mobile_app_install_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "ts",
          },
          header: {
            content: "App installs",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_page_engagement_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Page Eng.",
            info: "Page engagements initiated by this Ad. ",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_post_engagement_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Post Eng.",
            info: "Post engagements initiated by this Ad",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_post_reaction_action",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Reactions",
            info: "Reactions on your Ad post",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_unique_inline_link_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "U. Inline Link Clicks",
            info: "Unique Inline link clicks",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "avg_cpc",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "AVG. CPC",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "avg_cpc=cost/ts_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. Average Cpc is calculated by dividing the amount spent by the number of clicks, as reported by the traffic source, for your campaigns and campaign items."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_conversions",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Conversions (Tracker)",
            info:
              "The number of conversion events reported by the tracking platform. Note: this does not include custom conversions. Only the main conversion event.",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "tr_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Revenue (Tracker)",
            info:
              "The generated revenue as reported by the tracking platform. Note: this does not include revenues from custom conversions. It only includes the main Revenue column of your tracker.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_cvr",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Cvr (Tracker)",
            info:
              "[Cvr (Tracker)] = ( [Conversions (Tracker)] / [Clicks (Tracker)] ) x 100; The calculated conversion rate based on the number of clicks and conversions reported by the tracking platform",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "ts_epc",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Epc",
            info:
              "[Epc] = [Revenue] / [Clicks]; The calculated earning per click based on the reported number of ad clicks and revenue from the traffic source (ad network).",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "ts_roi",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Roi",
            info:
              "[Roi] = ( [Net] / [Amount Spent] ) x 100; The calculated return on investment based on the ad spend and revenue reported by the traffic source (ad network).",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 2,
            style: "color",
          },
          display: false,
        },
        {
          item: {
            key: "tr_cpa",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Cpa (Tracker)",
            info:
              "[Cpa (Tracker)] = [Amount Spent] / [Conversions (Tracker)]; The calculated cost per action (acquisition) based on the number of conversions reported by the tracking platform and the amount spent reported by the traffic source.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "tr_clicks",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Clicks (Tracker)",
            info:
              "The amount of Ad Clicks (campaign link visits) reported by the tracking platform.",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "publisher_conversions",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Search Feed Conversions",
            info: "Conversions reported by your search feed provider",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "traffic_source_campaign_id",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Camp. ID",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_conversions",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "FB Conversions",
            info:
              "All conversion results reported on reported in Facebook (Aggregated Metric)",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "payout",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Payout",
            info:
              "[Payout] = [Revenue (Tracker)] / [Conversions (Tracker]; The average revenue that each conversion is generating. Payout is automatically calculated using the Revenue (Tracker) and Conversions (Tracker), but you can also override the automatic payout by clicking on the Payout cell and entering a static value manually.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_off_conv_view_content",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "View Content",
            info: "Offsite Conversion - View Content",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_add_payment_info",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Add Payment Info",
            info: "Offsite Conversion - Add Payment Info",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_add_to_cart",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Add To Cart",
            info: "Offsite Conversion - Add To Cart",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_add_to_wishlist",
            sortable: true,
            filter: true,
            enabledComparison: false,
            group: "tr",
          },
          header: {
            content: "Add To Wishlist",
            info: "Offsite Conversions - Add To Wishlist",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_complete_registration",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Complete Registration",
            info: "Offsite Conversions - Complete Registration",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_initiate_checkout",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Initiate Checkout",
            info: "Offsite Conversions - Initiate Checkout",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_lead",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Lead",
            info: "Offsite Conversions - Lead",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_purchase",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Purchase",
            info: "Offsite Conversions - Purchase",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_off_conv_search",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Search",
            info: "Offsite Conversions - Search",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_off_conv_all_custom",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "All custom events",
            info: "All custom events aggregated ",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 0,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "facebook_results",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Ad Results",
            info: "Results based on AdSet promoted object",
            infoType: "popover",
          },
          options: {
            format: "string",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "facebook_cost_link_click",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Avg. Link CPC",
            info:
              "Average Cost per Link Click. Calculated as: Avg. Link CPC = Cost/Link Clicks",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: true,
        },
        {
          item: {
            key: "lp_ctr",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Landing Page Ctr",
            info:
              "[Landing Page Ctr] = ( [Landing Page Clicks] / [ Clicks (Tracker)] ) x 100; The calculated landing page click-through rate percentage, based on landing page clicks and total clicks reported by the tracking platform.",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "ts_revenue",
            sortable: true,
            filter: true,
            enabledComparison: false,
          },
          header: {
            content: "Revenue",
            info:
              "The revenue reported by the traffic source (ad network). This revenue is usually tracked by the ad network's pixel, or sent to the ad network via a server-2-server postback.",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
          display: true,
        },
        {
          header: {
            content: "RPC TONIC",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_revenue / publisher_clicks","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_1",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 2,
            style: "",
          },
          customMetric: "publisher_revenue / publisher_clicks",
          display: false,
        },
        {
          header: {
            content: "Payout - TS Conv (Avg.)",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"tr_revenue / ts_conversions","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_2",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "tr_revenue / ts_conversions",
          display: false,
        },
        {
          header: {
            content: "LP CTR (TS clicks)",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"( lp_clicks / ts_clicks ) * 100","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_3",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "color",
          },
          customMetric: "( lp_clicks / ts_clicks ) * 100",
          display: false,
        },
        {
          header: {
            content: "CTR TONIC",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_clicks / ts_clicks","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_4",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 2,
            style: "",
          },
          customMetric: "publisher_clicks / ts_clicks",
          display: false,
        },
        {
          header: {
            content: "CPA TONIC",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_clicks / cost","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_5",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 2,
            style: "",
          },
          customMetric: "publisher_clicks / cost",
          display: false,
        },
        {
          header: {
            content: "Payout - TR (Avg.)",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"tr_revenue / tr_conversions","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_6",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          customMetric: "tr_revenue / tr_conversions",
          display: false,
        },
        {
          header: {
            content: "RPC (Pub)",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_revenue / publisher_clicks","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_7",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "publisher_revenue / publisher_clicks",
          display: true,
        },
        {
          header: {
            content: "CPA (Pub)",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"cost / publisher_clicks","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_8",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 3,
            style: "",
          },
          customMetric: "cost / publisher_clicks",
          display: true,
        },
        {
          header: {
            content: "RPC TONIC",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"publisher_revenue / publisher_clicks","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_9",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "number",
            precision: 2,
            style: "",
          },
          customMetric: "publisher_revenue / publisher_clicks",
          display: false,
        },
        {
          header: {
            content: "CVR (Pub)",
            info:
              '{"default":{"text":"This is a custom metric. It\'s value is calculated by the formula: {{formula}}","variables":{"formula":{"value":"( publisher_clicks / ts_clicks ) * 100","type":"FORMULA"}}}}',
            infoType: "popover",
          },
          item: {
            filter: true,
            key: "custom_metric_10",
            sortable: true,
            enabledComparison: false,
          },
          options: {
            format: "percentage",
            precision: 0,
            style: "color",
          },
          customMetric: "( publisher_clicks / ts_clicks ) * 100",
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customConversions2",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "chargeback",
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "customRevenue2",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "chargeback Revenue",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            key: "additional_fields.bid_strategy",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Bid Strategy",
            infoType: "popover",
          },
          display: true,
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            key: "traffic_source_unique_name",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Traffic Source",
            infoType: "popover",
          },
          display: false,
          options: {
            format: "string",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            key: "ecpm",
            sortable: true,
            filter: false,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "eCpm",
            info: "eCPM = (Ad Spend/Impression)*1000",
            infoType: "popover",
          },
          display: false,
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "est_cost",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Estimated Spent",
            info:
              "[Est. Spent] = [Avg. Cpc]  [Clicks (Tracker)]; NOTE: Estimated Spend is only available if you have connected a tracking platform.  To make up for the delay some traffic sources have in reporting the accurate spend for the day, we try to estimate its value using the average Cpc and multiplying it by the amount of clicks reported by your trackign platform, Clicks (Tracker).",
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "est_net",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Est. Net",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "est_net=ts_revenue-est_cost",                         "type": "FORMULA"                     }                 },                 "text": "Because Taboola stats are delayed, we calculate an estimated net as: {{formula}}"             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "color",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "est_roi",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Est. Roi",
            info:
              "Because Taboola stats are delayed, we calculate an estimated ROI as: Est. ROI = Est. Net / Est. Cost",
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "color",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "tr_epc",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Epc (Tracker)",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "tr_epc=tr_revenue/tr_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}} The calculated earning per click, based on the Revenue (Tracker) and Clicks (Tracker), as reported by the tracking platform."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "epc",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Epc",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "epc=tr_revenue/tr_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}} The earning per click based on the Revenue (Tracker), reported by the tracking platform, and ad Clicks you paid for on the traffic source (Ad Netowrk).  The reason why this version of Epc is needed is because sometimes tracking platforms might report more or less clicks, compared to the traffic source, so the Epc might not be as accurate as the one calculated on traffic source clicks."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "impressions",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Impressions",
            info:
              ' {             "default": {                 "text": "The number of ad impressions reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "ts_clicks",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Clicks",
            info:
              ' {             "default": {                 "text": "The number of ad clicks reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "lp_clicks",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Landing Page Clicks",
            info:
              ' {             "default": {                 "text": "The amount of visitors which clicked on a call-to-action link inside your landing page (click to an offer link), as reported by the tracking platform."             }         }',
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "click_loss",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Click Loss",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "click_loss=ts_clicks - tr_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The difference between clicks reported by your traffic source and clicks reported by your tracking platform. Some times, for various reasons, your tracking platform may report less or more clicks than what your ad network is reporting."             }         }',
            infoType: "popover",
          },
          display: false,
          options: {
            format: "numeric",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "ts_conversions",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Conversions",
            info:
              ' {             "default": {                 "text": "The number of conversions tracked and reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "numeric",
            precision: 0,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "ts_net",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Net",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_net=ts_revenue-cost",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated net profit based on the ad spend and revenue reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 2,
            style: "color",
          },
        },
        {
          item: {
            filter: true,
            key: "ts_cpa",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Cpa",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_cpa=cost/ts_conversions",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated cost per action based on the ad spend and the number of conversions reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "ts_cvr",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Cvr",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "ts_cvr=ts_conversions/ts_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated conversion rate based on the ad clicks and the number of conversions reported by the traffic source (ad network)."             }         }',
            infoType: "popover",
          },
          display: false,
          options: {
            format: "percentage",
            precision: 2,
            style: "",
          },
        },
        {
          item: {
            filter: true,
            key: "lp_cr",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "Landing Page Cr",
            info:
              '{             "default": {                 "variables": {                     "formula": {                         "value": "lp_cr=tr_conversions/lp_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. The calculated Landing Page Conversion Rate, based on the amount of Landing Page Clicks and Conversions (Tracker) reported by the tracking platform."             }         }',
            infoType: "popover",
          },
          options: {
            format: "percentage",
            precision: 3,
            style: "",
          },
          display: false,
        },
        {
          item: {
            filter: true,
            key: "cp_lp_clicks",
            sortable: true,
            enabledComparison: false,
            group: "campaign",
          },
          header: {
            content: "LP CPC",
            info:
              ' {             "default": {                 "variables": {                     "formula": {                         "value": "cp_lp_clicks=cost/lp_clicks",                         "type": "FORMULA"                     }                 },                 "text": "{{formula}}. How much you are paying for each landing page click (click to offer). It is calculated using Landing Page Clicks reported by your tracking platform, and amount spent, reported by the traffic source."             }         }',
            infoType: "popover",
          },
          options: {
            format: "currency",
            precision: 3,
            style: "",
          },
        },
      ],
      items: performanceItems,
      totals: {
        "name.first": 40,
        balance: 250,
        age: 36,
      },
      options: {
        pagination: false,
      },
    },
    myToggle: false,
    tableSelect: [],
    columnFilter: {},
    sticky: true,
    resizedColumns: {},
  };
  }