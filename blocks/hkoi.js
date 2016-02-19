/**
 * @license
 * Blockly HKOI Extension
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
 * @fileoverview Extra HKOI blocks for Blockly.
 * @author info@hkoi.org (Tony Wong)
 */
'use strict';

goog.provide('Blockly.Blocks.hkoi');

goog.require('Blockly.Blocks');

Blockly.Blocks['hkoi_endl'] = {
  /**
   * Block for end of line character.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(160);
    this.setOutput(true, 'String');
    this.appendDummyInput().appendField(Blockly.Msg.HKOI_LINE_BREAK);
  }
};


Blockly.Blocks['hkoi_println'] = {
  /**
   * Block for print statement.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.HKOI_PRINTLN_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160,
      "tooltip": Blockly.Msg.TEXT_PRINT_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_PRINT_HELPURL
    });
  }
};
