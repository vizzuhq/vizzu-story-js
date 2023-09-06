import { filterAssets } from "../chart-params/filter.js";
import { configAssets } from "../chart-params/config.js";
import { styleAssets } from "../chart-params/style.js";
import { animOptionsAssets } from "../chart-params/animOptions.js";

const slidesWithOneSlideWithOneStep = [];

slidesWithOneSlideWithOneStep.push(
  {
    description: "filter",
    input: {
      slides: [{ filter: filterAssets.filter1 }],
    },
    expected: [[[{ target: { data: { filter: filterAssets.filter1 } } }]]],
  },
  {
    description: "config",
    input: {
      slides: [{ config: configAssets.config1 }],
    },
    expected: [[[{ target: { data: {}, config: configAssets.config1 } }]]],
  },
  {
    description: "style",
    input: {
      slides: [{ style: styleAssets.style1 }],
    },
    expected: [[[{ target: { data: {}, style: styleAssets.style1 } }]]],
  },
  {
    description: "animOptions",
    input: {
      slides: [{ animOptions: animOptionsAssets.animOptions1 }],
    },
    expected: [
      [[{ target: { data: {} }, options: animOptionsAssets.animOptions1 }]],
    ],
  }
);

slidesWithOneSlideWithOneStep.push(
  {
    description: "filter, animOptions",
    input: {
      slides: [
        {
          filter: filterAssets.filter1,
          animOptions: animOptionsAssets.animOptions1,
        },
      ],
    },
    expected: [
      [
        [
          {
            target: { data: { filter: filterAssets.filter1 } },
            options: animOptionsAssets.animOptions1,
          },
        ],
      ],
    ],
  },
  {
    description: "config, animOptions",
    input: {
      slides: [
        {
          config: configAssets.config1,
          animOptions: animOptionsAssets.animOptions1,
        },
      ],
    },
    expected: [
      [
        [
          {
            target: { data: {}, config: configAssets.config1 },
            options: animOptionsAssets.animOptions1,
          },
        ],
      ],
    ],
  },
  {
    description: "style, animOptions",
    input: {
      slides: [
        {
          style: styleAssets.style1,
          animOptions: animOptionsAssets.animOptions1,
        },
      ],
    },
    expected: [
      [
        [
          {
            target: { data: {}, style: styleAssets.style1 },
            options: animOptionsAssets.animOptions1,
          },
        ],
      ],
    ],
  }
);

slidesWithOneSlideWithOneStep.push({
  description: "filter, config, style, animOptions",
  input: {
    slides: [
      {
        filter: filterAssets.filter1,
        config: configAssets.config1,
        style: styleAssets.style1,
        animOptions: animOptionsAssets.animOptions1,
      },
    ],
  },
  expected: [
    [
      [
        {
          target: {
            data: { filter: filterAssets.filter1 },
            config: configAssets.config1,
            style: styleAssets.style1,
          },
          options: animOptionsAssets.animOptions1,
        },
      ],
    ],
  ],
});

export { slidesWithOneSlideWithOneStep };
