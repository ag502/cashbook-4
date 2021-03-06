export default {
  create: (tag) => {
    return document.createElement(tag);
  },
  find: (query) => {
    return document.querySelector(query);
  },
};

Element.prototype.addClass = function (...className) {
  className.forEach((name) => this.classList.add(name));
  return this;
};

Element.prototype.removeClass = function (...className) {
  className.forEach((name) => this.classList.remove(name));
  return this;
};

Element.prototype.toggleClass = function (...className) {
  className.forEach((name) => this.classList.toggle(name));
  return this;
};

Element.prototype.addId = function (id) {
  this.setAttribute('id', id);
  return this;
};

Element.prototype.addElement = function (element) {
  this.appendChild(element);
  return this;
};

Element.prototype.setText = function (text) {
  this.innerText = text;
  return this;
};

Element.prototype.setHTML = function (html) {
  this.innerHTML = html;
  return this;
};

Element.prototype.setAttr = function (attrType, attr) {
  this.setAttribute(attrType, attr);
  return this;
};

Element.prototype.getAttr = function (attrType) {
  return this.getAttribute(attrType);
};
