import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("./products.js", import.meta.url), "utf8");
const products = runInNewContext(`${source}\nproducts`);
const counts = { coffee: 0, tea: 0, dessert: 0 };

for (const product of products) {
    assert.ok(product.category in counts);
    assert.ok(product.name && product.description && product.price > 0);
    assert.ok(existsSync(new URL(product.image, import.meta.url)), product.image);
    counts[product.category]++;
}

assert.deepEqual(counts, { coffee: 8, tea: 4, dessert: 8 });
assert.doesNotMatch(readFileSync(new URL("./catalog-page.html", import.meta.url), "utf8"), /<article class="item"/);
console.log("Product data check passed");
