import _ from 'lodash';
import './style/index.css'; // css-loader style-loader
import './style/demo.scss'; // css-loader style-loader
import $ from 'jquery';
function createDom() {
  const dom = document.createElement('div');
  dom.innerHTML = _.join(['www', 'baidu', 'com']);
  dom.className = 'box';
  return dom;
}
const divDom = createDom();
console.log(111);
console.log($);

document.body.appendChild(divDom);
