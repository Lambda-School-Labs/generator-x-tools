const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env');
const result = require('dotenv').config({ path: envPath })
if (result.error) {
  throw result.error
}
const ghOrg = "Lambda-School-Labs";

exports.fs = fs;
exports.BaseGenerator = require('@lambdalabs/base-generator');
exports.pkg = require('../package.json');
exports.klr = require('kleur');

const { Octokit } = require("@octokit/rest");
const opts = {
  auth: process.env.GITHUBKEY,
  userAgent: `LambdaLabs-Tools v${exports.pkg.version}`,
};
if (process.env.GHDEBUG == 'true') { opts.log = console; }
exports.octokit = new Octokit(opts);

exports._inspect = (obj) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(`${exports.klr.bold(prop)}: ${obj[prop]}`)
    }
  }
}

exports.ghConfig = {
  defaultRepoOpts: {
    org: ghOrg,
    private: false,
    visibility: "public",
    has_issues: true,
    has_projects: false,
    auto_init: false,
    allow_squash_merge: true,
    allow_merge_commit: true,
    allow_rebase_merge: true,
    delete_branch_on_merge: true,
  }
};