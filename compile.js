#!/usr/bin/env node

'use strict';

global.DOMParser = require('xmldom').DOMParser; 
require('../closure-library/closure/goog/bootstrap/nodejs')
global.Blockly = require('./blockly_wrapped.js');
require('./blocks_compressed.js');
require('./javascript_compressed.js');
require('./msg/js/en.js');

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
Blockly.Xml.domToWorkspace(workspace, xml);
var code = Blockly.JavaScript.workspaceToCode(workspace);

var prepend = "var HKOIInput = {}; HKOIInput.buf = new Buffer(1024); HKOIInput.br = 0; HKOIInput.str = '';\n";
prepend += "while (true) {\n  HKOIInput.br = require('fs').readSync(process.stdin.fd, HKOIInput.buf, 0, 1024);\n";
prepend += "  if (HKOIInput.br == 0) break;\n  HKOIInput.str += HKOIInput.buf.toString(null, 0, HKOIInput.br);}\n";
prepend += "HKOIInput.lines = HKOIInput.str.split('\\n');\n";
prepend += "var window = { 'alert': function(x) { console.log(x); }, 'prompt': function(x) { return HKOIInput.lines.shift(); } };\n\n";
code = prepend + code;
fs.writeFileSync('program.exe', code);
