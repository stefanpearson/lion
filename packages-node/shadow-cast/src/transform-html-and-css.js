const { transformHtml } = require('./transform-html.js');
const { transformCss } = require('./transform-css/transform-css.js');

/**
 * @typedef {import('../types/csstree').SelectorPlain} SelectorPlain
 * @typedef {import('../types/csstree').Selector} Selector
 * @typedef {import('../types/csstree').CssNodePlain} CssNodePlain
 * @typedef {import('../types/csstree').CssNode} CssNode
 * @typedef {import('../types/shadow-cast').CssTransformConfig} CssTransformConfig
 */

/**
 * @param {string} annotatedHtmlString
 * @param {CssTransformConfig} [cssTransformConfig]
 */
function transformHtmlAndCss(annotatedHtmlString, cssTransformConfig) {
  const htmlResult = transformHtml(annotatedHtmlString);

  const cssResult = transformCss({
    ...htmlResult.cssTransformConfig,
    ...cssTransformConfig,
    htmlMeta: htmlResult.meta,
  });

  console.log(htmlResult.cssTransformConfig);

  // Override for now, allow deep merge via options
  return {
    shadowHtml: htmlResult.shadowHtml,
    slotsHtml: htmlResult.slotsHtml,
    shadowCss: cssResult,
  };
}

module.exports = {
  transformHtmlAndCss,
};