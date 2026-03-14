import { channelLettersPages } from "./channel-letters";
import { bladeSignsPages } from "./blade-signs";
import { flatCutLettersPages } from "./flat-cut-letters";
import { lightBoxesPages } from "./light-boxes";
import { cabinetSignsPages } from "./cabinet-signs";
import { generalPages } from "./general";
import { engineeringPages } from "./engineering";
import { illuminationPages } from "./illumination";
import { logoBoxesPages } from "./logo-boxes";
import { pushThroughSignsPages } from "./push-through-signs";
import { LandingPage } from "./types";

export type { LandingPage };

export const allLandingPages: LandingPage[] = [
  ...channelLettersPages,
  ...bladeSignsPages,
  ...flatCutLettersPages,
  ...lightBoxesPages,
  ...cabinetSignsPages,
  ...generalPages,
  ...engineeringPages,
  ...illuminationPages,
  ...logoBoxesPages,
  ...pushThroughSignsPages,
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return allLandingPages.find((p) => p.slug === slug);
}

export function getLandingPagesByHub(hubSlug: string): LandingPage[] {
  return allLandingPages.filter((p) => p.hubSlug === hubSlug);
}
