import userpass from "../userpass";

it("packages/barterdex-api/src/server/userpass", () => {
  expect(typeof userpass).toBe("function");
  expect(userpass("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  expect(userpass("a")).toBe("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb");
  expect(userpass("able valid quality radio connect party sunset defense robust brown rib slow diary cram")).toBe("437c9eaada1ee1731dcc9ba0d1ec730ae5e08ec61a03baf32cc85d22ca9c42a7");
});
