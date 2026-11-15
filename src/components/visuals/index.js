import AvailabilityVisual from "./AvailabilityVisual";
import ArchitectureVisual from "./ArchitectureVisual";
import AnalyticsVisual from "./AnalyticsVisual";

const VISUALS = {
  availability: AvailabilityVisual,
  architecture: ArchitectureVisual,
  analytics: AnalyticsVisual,
};

/** Illustration used when a project has no screenshots. */
export function getVisual(key) {
  return VISUALS[key] ?? AvailabilityVisual;
}