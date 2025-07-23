import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const CommitlintConfig: UserConfig = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)\(#(\d+)\):\s(.+)/,
      headerCorrespondence: ['type', 'issueNumber', 'title'],
    },
  },
  plugins: [
    {
      rules: {
        "xitomatl-header-pattern": (parsed) => {
          const { type, issueNumber, title } = parsed;

          if (type === null && issueNumber === null && title === null) {
            return [
              false,
              "Header must be in format '<issue_type>(#<issue_number>): <message>'",
            ];
          }
          return [true, ""];
        },
        "xitomatl-type-enum": (parsed, _when, expectedValue: any) => {
          const { type } = parsed;

          if (type && !expectedValue.includes(type)) {
            return [
              false,
              `issue_type must be one of ${expectedValue}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "xitomatl-header-pattern": [RuleConfigSeverity.Error, "always"] as const,
    "xitomatl-type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "chore",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
      ],
    ] as const
  },
};

export default CommitlintConfig;