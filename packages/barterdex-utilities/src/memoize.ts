// https://github.com/caiogondim/fast-memoize.js

//
// Strategy
//

function isPrimitive(value) {
  return (
    value == null || typeof value === 'number' || typeof value === 'boolean'
  ); // || typeof value === "string" 'unsafe' primitive for our needs
}

function monadic(fn, cache, serializer, arg) {
  const cacheKey = isPrimitive(arg) ? arg : serializer(arg);

  let computedValue = cache.get(cacheKey);
  if (typeof computedValue === 'undefined') {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function variadic(fn, cache, serializer) {
  const args = Array.prototype.slice.call(arguments, 3);
  const cacheKey = serializer(args);

  let computedValue = cache.get(cacheKey);
  if (typeof computedValue === 'undefined') {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}

function strategyDefault(fn, options) {
  const strategy = fn.length === 1 ? monadic : variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  );
}

function strategyVariadic(fn, options) {
  const strategy = variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  );
}

function strategyMonadic(fn, options) {
  const strategy = monadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  );
}

//
// Serializer
//

function serializerDefault() {
  return JSON.stringify(arguments);
}

//
// Cache
//

function ObjectWithoutPrototypeCache() {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function(key) {
  return key in this.cache;
};

ObjectWithoutPrototypeCache.prototype.get = function(key) {
  return this.cache[key];
};

ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
  this.cache[key] = value;
};

const cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
};

//
// Main
//

interface MemoizeOption {
  cache?: any,
  serializer?: any,
  strategy?: any
};

const memoizeOption = {
  cache: cacheDefault,
  serializer: serializerDefault,
  strategy: strategyDefault
};

function memoize(fn, { cache = cacheDefault, serializer = serializerDefault, strategy = strategyDefault } : MemoizeOption = memoizeOption) {
  return strategy(fn, {
    cache,
    serializer
  });
}

//
// API
//

memoize.strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};

export default memoize;
