// @package
// https://github.com/michaelrhodes/scroll
const E_NOSCROLL = new Error('Element already at target scroll position');
const E_CANCELLED = new Error('Scroll cancelled');
const { min } = Math;

function make(prop) {
  return function scroll(el, to, opts = {}, cb = noop) {
    if (typeof opts === 'function') (cb = opts), (opts = {});

    const start = +new Date();
    const from = el[prop];
    const ease = opts.ease || inOutQuint;
    const duration = !Number.isNaN(opts.duration) ? +opts.duration : 350;
    let cancelled = false;

    return (
      from === to ? cb(E_NOSCROLL, el[prop]) : requestAnimationFrame(animate),
      cancel
    );

    function cancel() {
      cancelled = true;
    }

    function animate(/* timestamp */) {
      if (cancelled) return cb(E_CANCELLED, el[prop]);

      const now = +new Date();
      const time = min(1, (now - start) / duration);
      const eased = ease(time);

      el[prop] = eased * (to - from) + from;

      time < 1
        ? requestAnimationFrame(animate)
        : requestAnimationFrame(() => {
            cb(null, el[prop]);
          });
    }
  };
}

function inOutQuint(n) {
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
}

function noop() {}

export default {
  left: make('scrollLeft'),
  top: make('scrollTop')
};
