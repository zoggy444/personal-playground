"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Then = exports.When = exports.Given = exports.test = void 0;
const playwright_bdd_1 = require("playwright-bdd");
exports.test = playwright_bdd_1.test.extend({
    storageState: async ({ $tags, storageState }, use) => {
        // reset storage state for features/scenarios with @noauth tag
        if ($tags.includes('@noauth')) {
            storageState = { cookies: [], origins: [] };
        }
        await use(storageState);
    },
});
_a = (0, playwright_bdd_1.createBdd)(exports.test), exports.Given = _a.Given, exports.When = _a.When, exports.Then = _a.Then;
