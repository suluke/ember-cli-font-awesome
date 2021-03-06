import Ember from 'ember';

var FA_PREFIX = /^fa\-.+/;

var warn = Ember.Logger.warn;

/**
 * Handlebars helper for generating HTML that renders a FontAwesome icon.
 *
 * @param  {String} name    The icon name. Note that the `fa-` prefix is optional.
 *                          For example, you can pass in either `fa-camera` or just `camera`.
 * @param  {Object} options Options passed to helper.
 * @return {Ember.Handlebars.SafeString} The HTML markup.
 */
var faIcon = function(name, options) {
  if (Ember.typeOf(name) !== 'string') {
    var message = "fa-icon: no icon specified";
    warn(message);
    return new Ember.Handlebars.SafeString(message);
  }

  var params = options.hash,
    classNames = [],
    html = "";

  classNames.push("fa");
  if (!name.match(FA_PREFIX)) {
    name = "fa-" + name;
  }
  classNames.push(name);
  if (params.spin) {
    classNames.push("fa-spin");
  }
  if (params.flip) {
    classNames.push("fa-flip-" + params.flip);
  }
  if (params.rotate) {
    classNames.push("fa-rotate-" + params.rotate);
  }
  if (params.lg) {
    warn("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}");
    classNames.push("fa-lg");
  }
  if (params.x) {
    warn("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"" + params.x + "\"}}");
    classNames.push("fa-" + params.x + "x");
  }
  if (params.size) {
    if (Ember.typeOf(params.size) === "string" && params.size.match(/\d+/)) {
      params.size = Number(params.size);
    }
    if (Ember.typeOf(params.size) === "number") {
      classNames.push("fa-" + params.size + "x");
    } else {
      classNames.push("fa-" + params.size);
    }
  }
  if (params.fixedWidth) {
    classNames.push("fa-fw");
  }
  if (params.listItem) {
    classNames.push("fa-li");
  }
  if (params.pull) {
    classNames.push("pull-" + params.pull);
  }
  if (params.border) {
    classNames.push("fa-border");
  }
  if (params.classNames && !Ember.isArray(params.classNames)) {
    params.classNames = [ params.classNames ];
  }
  if (!Ember.isEmpty(params.classNames)) {
    Array.prototype.push.apply(classNames, params.classNames);
  }
  
  
  html += "<";
  var tagName = params.tagName || 'i';
  html += tagName;
  html += " class='" + classNames.join(" ") + "'";
  if (params.title) {
    html += " title='" + params.title + "'";
  }
  if (params.ariaHidden === undefined || params.ariaHidden) {
    html += " aria-hidden=\"true\"";
  }
  html += "></" + tagName + ">";
  return new Ember.Handlebars.SafeString(html);
};

export {
  faIcon
};

export default Ember.Handlebars.makeBoundHelper(faIcon);
