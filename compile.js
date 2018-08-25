#!/usr/bin/nodejs

'use strict';

global.DOMParser = require('xmldom').DOMParser; 
//require('../closure-library/closure/goog/bootstrap/nodejs')
global.Blockly = require('./blockly_wrapped.js');
//require('./blocks_compressed.js');
//require('./javascript_compressed.js');
//require('./msg/js/en.js');

Blockly.Events.Create = function() { this.isNull=function(){return 1}; };

var fname = process.argv[0] == 'blockly' ? process.argv[1] : process.argv[2];
var fs = require('fs');
var xmlText = fs.readFileSync(fname, 'utf8');

try {
    var xml = Blockly.Xml.textToDom(xmlText);
}
catch (e) {
    console.log(e);
    process.exit(2);
}

var workspace = new Blockly.Workspace();
Blockly.Xml.domToWorkspace(xml, workspace);
var code = Blockly.JavaScript.workspaceToCode(workspace);

var prepend = `
var HKOIInput = {
  lines : []
};
var window = {
  'alert': function(x) {
    console.log(x);
  },
  'prompt': function(x) {
    return HKOIInput.lines.shift();
  }
};
var HKOIUpdateVar = function() {};
var HKOIEnterScope = function() {};
var HKOIExitScope = function() {};

const solution = () => {
`;

var append = `
};

(function() {
  var str = "";
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    str += chunk;
  });
  process.stdin.on('end', () => {
    HKOIInput.lines = str.split('\\n');
    solution();
  });
})();
`;

code = prepend + code + append;
code = code.replace(/^\s*HKOIUpdateVar.*/gm, '');

fs.writeFileSync('program.exe', code);
fs.chmodSync('program.exe', 493);
