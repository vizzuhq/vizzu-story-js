import { dataAssets } from "./data.js";
import { dataFilterAssets } from "./datafilter.js";
import { configAssets } from "./config.js";
import { styleAssets } from "./style.js";

const story = [
  "slides contain more slides with more steps with more anim targets",
  {
    slides: [
      [
        {
          config: configAssets.config1,
          style: styleAssets.style1,
          filter: dataFilterAssets.filter1,
        },
        {
          config: configAssets.config2,
          style: styleAssets.style2,
          filter: dataFilterAssets.filter2,
        },
      ],
      [
        {
          config: configAssets.config3,
          style: styleAssets.style3,
          filter: dataFilterAssets.filter3,
        },
      ],
      {
        config: configAssets.config4,
        style: styleAssets.style4,
        filter: dataFilterAssets.filter4,
      },
      [
        {
          config: configAssets.config1,
          style: styleAssets.style1,
          filter: dataFilterAssets.filter1,
        },
        {
          config: configAssets.config2,
          style: styleAssets.style2,
          filter: dataFilterAssets.filter2,
        },
      ],
    ],
  },
  [
    [
      [
        {
          target: {
            data: { filter: dataFilterAssets.filter1 },
            config: configAssets.config1,
            style: styleAssets.style1,
          },
        },
        {
          target: {
            data: { filter: dataFilterAssets.filter2 },
            config: configAssets.config2,
            style: styleAssets.style2,
          },
        },
      ],
    ],
    [
      [
        {
          target: {
            data: { filter: dataFilterAssets.filter3 },
            config: configAssets.config3,
            style: styleAssets.style3,
          },
        },
      ],
    ],
    [
      [
        {
          target: {
            data: { filter: dataFilterAssets.filter4 },
            config: configAssets.config4,
            style: styleAssets.style4,
          },
        },
      ],
    ],
    [
      [
        {
          target: {
            data: { filter: dataFilterAssets.filter1 },
            config: configAssets.config1,
            style: styleAssets.style1,
          },
        },
        {
          target: {
            data: { filter: dataFilterAssets.filter2 },
            config: configAssets.config2,
            style: styleAssets.style2,
          },
        },
      ],
    ],
  ],
];

export { story };

const slides = [];

// zero slide
slides.push([
  "slides is empty",
  {
    slides: [],
  },
  [],
]);

// one slide, one step, one anim target
slides.push(
  [
    "slides contain one slide with one step (object) with config",
    {
      slides: [{ config: configAssets.config1 }],
    },
    [[[{ target: { data: {}, config: configAssets.config1 } }]]],
  ],
  [
    "slides contain one slide with one step (list) with config",
    {
      slides: [[{ config: configAssets.config1 }]],
    },
    [[[{ target: { data: {}, config: configAssets.config1 } }]]],
  ],
  [
    "object contains style and slides contain one slide with one step (object) with style",
    {
      style: styleAssets.style2,
      slides: [{ style: styleAssets.style1 }],
    },
    [[[{ target: { data: {}, style: styleAssets.style1 } }]]],
  ],
  [
    "slides contain one slide with one step (object) with style",
    {
      slides: [{ style: styleAssets.style1 }],
    },
    [[[{ target: { data: {}, style: styleAssets.style1 } }]]],
  ],
  [
    "object contains style and slides contain one slide with one step (list) with style",
    {
      style: styleAssets.style2,
      slides: [[{ style: styleAssets.style1 }]],
    },
    [[[{ target: { data: {}, style: styleAssets.style1 } }]]],
  ],
  [
    "slides contain one slide with one step (list) with style",
    {
      slides: [[{ style: styleAssets.style1 }]],
    },
    [[[{ target: { data: {}, style: styleAssets.style1 } }]]],
  ],
  [
    "object contains data and slides contain one slide with one step (object) with filter",
    {
      data: dataAssets.data1,
      slides: [{ filter: dataFilterAssets.filter1 }],
    },
    [
      [
        [
          {
            target: {
              data: Object.assign({}, dataAssets.data1, {
                filter: dataFilterAssets.filter1,
              }),
            },
          },
        ],
      ],
    ],
  ],
  [
    "slides contain one slide with one step (object) with filter",
    {
      slides: [{ filter: dataFilterAssets.filter1 }],
    },
    [[[{ target: { data: { filter: dataFilterAssets.filter1 } } }]]],
  ],
  [
    "object contains style and slides contain one slide with one step (list) with filter",
    {
      data: dataAssets.data1,
      slides: [[{ filter: dataFilterAssets.filter1 }]],
    },
    [
      [
        [
          {
            target: {
              data: Object.assign({}, dataAssets.data1, {
                filter: dataFilterAssets.filter1,
              }),
            },
          },
        ],
      ],
    ],
  ],
  [
    "slides contain one slide with one step (list) with filter",
    {
      slides: [[{ filter: dataFilterAssets.filter1 }]],
    },
    [[[{ target: { data: { filter: dataFilterAssets.filter1 } } }]]],
  ]
);

// more slides, one step, one anim target
slides.push(
  [
    "slides contain more slides with one-one step (object)",
    {
      slides: [
        { config: configAssets.config1 },
        { config: configAssets.config2 },
      ],
    },
    [
      [[{ target: { data: {}, config: configAssets.config1 } }]],
      [[{ target: { config: configAssets.config2 } }]],
    ],
  ],
  [
    "slides contain more slides with one-one step (list)",
    {
      slides: [
        [{ config: configAssets.config1 }],
        [{ config: configAssets.config2 }],
      ],
    },
    [
      [[{ target: { data: {}, config: configAssets.config1 } }]],
      [[{ target: { config: configAssets.config2 } }]],
    ],
  ]
);

// more slides, more steps, more anim targets
slides.push(story);

export { slides };
