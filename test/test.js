const http = require("http");
const test = require("ava");
const got = require("got");
const listen = require("test-listen");
const app = require("../src/App");

test.before(async t => {
    t.context.server = http.createServer(app);
    t.context.baseUrl = await listen(t.context.server);
});

test.after.always(t => {
    t.context.server.close();
})

test("foo", t => {
    t.pass();
});