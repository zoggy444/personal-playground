export default {
  paths: [
    "src/tests/features"
  ],
  dryRun: false,
  format: [
    "progress-bar",
    "summary",
    "json:reports/cucumber-report.json", // Generates a JSON report
    "html:reports/cucumber-report.html"
  ],
  formatOptions: {
    colorsEnabled: true,
    snippetInterface: "async-await"
  },
  stepDefinitions : [
    "src/tests/step_definitions/*.ts"
  ],
  import: [
    "src/tests/step_definitions/*.ts"
  ],
  importModule: [
    "tsx"
  ]
};