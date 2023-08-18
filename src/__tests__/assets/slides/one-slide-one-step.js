import { filterAssets } from "../chart-params/filter.js";
import { configAssets } from "../chart-params/config.js";
import { styleAssets } from "../chart-params/style.js";
import { animOptionsAssets } from "../chart-params/animOptions.js";

const slidesWithOneSlideAndWithOneStep = [];

slidesWithOneSlideAndWithOneStep.push([
  "filter",
  {
    slides: [{ filter: filterAssets.filter1 }],
  },
  [[[{ target: { data: { filter: filterAssets.filter1 } } }]]],
]);
slidesWithOneSlideAndWithOneStep.push([
  "config",
  {
    slides: [{ config: configAssets.config1 }],
  },
  [[[{ target: { data: {}, config: configAssets.config1 } }]]],
]);
slidesWithOneSlideAndWithOneStep.push([
  "style",
  {
    slides: [{ style: styleAssets.style1 }],
  },
  [[[{ target: { data: {}, style: styleAssets.style1 } }]]],
]);
slidesWithOneSlideAndWithOneStep.push([
  "animOptions",
  {
    slides: [{ animOptions: animOptionsAssets.animOptions1 }],
  },
  [[[{ target: { data: {} }, options: animOptionsAssets.animOptions1 }]]],
]);

slidesWithOneSlideAndWithOneStep.push(
  [
    "filter and animOptions",
    {
      slides: [
        {
          filter: filterAssets.filter1,
          animOptions: animOptionsAssets.animOptions1,
        },
      ],
    },
    [
      [
        [
          {
            target: { data: { filter: filterAssets.filter1 } },
            options: animOptionsAssets.animOptions1,
          },
        ],
      ],
    ],
  ],
  [
    "config and animOptions",
    {
      slides: [
        {
          config: configAssets.config1,
          animOptions: animOptionsAssets.animOptions1,
        },
      ],
    },
    [
      [
        [
          {
            target: { data: {}, config: configAssets.config1 },
            options: animOptionsAssets.animOptions1,
          },
        ],
      ],
    ],
  ],
  [
    "style and animOptions",
    {
      slides: [
        {
          style: styleAssets.style1,
          animOptions: animOptionsAssets.animOptions1,
        },
      ],
    },
    [
      [
        [
          {
            target: { data: {}, style: styleAssets.style1 },
            options: animOptionsAssets.animOptions1,
          },
        ],
      ],
    ],
  ]
);

slidesWithOneSlideAndWithOneStep.push([
  "filter, config, style and animOptions",
  {
    slides: [
      {
        filter: filterAssets.filter1,
        config: configAssets.config1,
        style: styleAssets.style1,
        animOptions: animOptionsAssets.animOptions1,
      },
    ],
  },
  [
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
]);

export { slidesWithOneSlideAndWithOneStep };
