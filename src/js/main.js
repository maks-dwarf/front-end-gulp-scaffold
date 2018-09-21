// test if JS is included in html and works
console.log('Maximum power!!!!');

// test if ES6 functionality works
const arr = [1, 2, 3, 26];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;
iAmJavascriptES6();