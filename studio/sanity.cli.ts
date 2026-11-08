import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "utmnj4rd";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    /** Hosted at https://ali-khan-portfolio.sanity.studio */
    appId: "unq1gmo0k6rrg19w9yaqejx2",
  },
});
