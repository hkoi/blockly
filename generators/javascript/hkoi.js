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

Blockly.JavaScript['hkoi_println'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'window.alert(' + argument0 + ' + \'\\n\');\n';
};
