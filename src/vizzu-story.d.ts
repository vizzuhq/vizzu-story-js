/** Vizzu library types */
import * as vizzu from "vizzu";

type Vizzu = typeof vizzu;

declare namespace Vizzu {
  export import Config = vizzu.Config;
  export import Data = vizzu.Data;
  export import Styles = vizzu.Styles;
  export import Anim = vizzu.Anim;
}

/** Atomic phase of a slide coressponding to one Vizzu.animate() call. */
interface Phase {
  config?: Vizzu.Config.Chart;
  filter?: Vizzu.Data.FilterCallback | null;
  style?: Vizzu.Styles.Chart;
  animOptions?: Vizzu.Anim.Options;
}

/** Slide consists of a single or multiple phase. Controls will navigate
 *  between slides. */
type Slide = Phase | Phase[];

/** Story configuration object represents the whole presentation containing
 *  the underlying data and the slides. */
interface Story {
  /** Data, copied into the initializer slide (if not present). */
  data?: Vizzu.Data.Set;
  /** Initial style, copied into the initializer slide (if not present). */
  style?: Vizzu.Styles.Chart;
  /** The sequence of the presentation's slides. */
  slides: Slide[];
}

export default class VizzuPlayer extends HTMLElement {
  /** Setter for story object. */
  set slides(slides: Story);
}
