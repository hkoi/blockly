/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2016 Hong Kong Olympiad in Informatics
 * http://hkoi.org/en/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for HKOI blocks.
 * @author info@hkoi.org (Tony Wong)
 */
'use strict';

goog.provide('Blockly.JavaScript.hkoi');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['hkoi_endl'] = function(block) {
  return ['\'\\n\'', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['hkoi_readvars'] = function(block) {
  var numvars = block.getFieldValue('numvars');
  var temp = Blockly.JavaScript.variableDB_.getDistinctName('temp_list', Blockly.Variables.NAME_TYPE);

  var code = '';
  var varnames = [];
  for (var i = 1; i <= numvars; i++) {
    varnames.push(block.getFieldValue('variable' + i));
    var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable' + i), Blockly.Variables.NAME_TYPE);
    code += name +
      ' = isNaN(parseFloat(' + temp + '[' + (i - 1) + '])) ? ' + temp + '[' + (i - 1) + '] : parseFloat(' + temp + '[' + (i - 1) + ']);\n';
    code += 'HKOIUpdateVar(\'' + name + '\', ' + name + ');\n';
  }
  return 'var ' + temp + ' = window.prompt(' + JSON.stringify(varnames.join(', ')) + ').match(/(\\S+)/g);\n' + code;
};


Blockly.JavaScript['hkoi_dp'] = function(block) {
  var arg = Blockly.JavaScript.valueToCode(block, 'value',
        Blockly.JavaScript.ORDER_NONE) || '0';
  var dp = parseInt(block.getFieldValue('dp'));
  return ['(' + arg + ').toFixed(' + dp + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['hkoi_bitwise_not'] = function(block) {
  var arg = Blockly.JavaScript.valueToCode(block, 'value',
        Blockly.JavaScript.ORDER_NONE) || '0';
  return ['~(parseInt(' + arg + '))', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['hkoi_bitwise'] = function(block) {
  var arg1 = Blockly.JavaScript.valueToCode(block, 'value1',
        Blockly.JavaScript.ORDER_NONE) || '0';
  var arg2 = Blockly.JavaScript.valueToCode(block, 'value2',
        Blockly.JavaScript.ORDER_NONE) || '0';
  var op = '&';
  switch (block.getFieldValue('mode')) {
    case 'AND': op = '&'; break;
    case 'OR': op = '|'; break;
    case 'XOR': op = '^'; break;
    case 'SHL': op = '<<'; break;
    case 'SHR_SIGNED': op = '>>'; break;
    case 'SHR_UNSIGNED': op = '>>>'; break;
  }
  return ['(parseInt(' + arg1 + ') ' + op + ' parseInt(' + arg2 + '))', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
