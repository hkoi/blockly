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

Blockly.Blocks['hkoi_readvars'] = {
  init: function() {
    var OPTIONS =
        [['1', '1'],
         ['2', '2'],
         ['3', '3'],
         ['4', '4'],
         ['5', '5'],
         ['6', '6'],
         ['7', '7'],
         ['8', '8']];
    this.setColour(330);
    var dropdown = new Blockly.FieldDropdown(OPTIONS, function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendDummyInput()
        .appendField(Blockly.Msg.HKOI_READVARS_INPUT)
        .appendField(dropdown, 'numvars')
        .appendField(Blockly.Msg.HKOI_READVARS_VARS);
    this.appendDummyInput("var1")
        .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME + '1'), "variable1");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  },
  /**
   * Create XML to store numvars
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var numVars = this.getFieldValue('numvars');
    container.setAttribute('numvars', numVars);
    return container;
  },
  /**
   * Parse XML to restore the variable inputs
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var numVars = xmlElement.getAttribute('numvars');
    this.updateShape_(numVars);
  },
  /**
   * Modify this block to have numvars inputs
   * @param {boolean} numVars True if this block has a divisor input.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(numVars) {
    // Add or remove a Dummy Input.
    for (var i = 2; i <= 8; i++) {
      var inputExists = this.getInput('var' + i);
      if (numVars >= i) {
        if (!inputExists) {
          this.appendDummyInput('var' + i)
              .appendField(',')
              .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME + i), "variable" + i);
        }
      } else if (inputExists) {
        this.removeInput('var' + i);
      }
    }
  },

  getVars: function() {
    var numVars = this.getFieldValue('numvars');
    var list = [];
    for (var i = 1; i <= numVars; i++) {
      list.push(this.getFieldValue('variable' + i));
    }
    return list;
  }
};

Blockly.Blocks['hkoi_dp'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg.HKOI_DP_TO)
        .appendField(new Blockly.FieldTextInput("3"), "dp")
        .appendField(Blockly.Msg.HKOI_DP_DECIMAL_PLACES);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['hkoi_bitwise_not'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.HKOI_BITWISE_NOT);
    this.appendValueInput("value")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, 'Number');
  }
};

Blockly.Blocks['hkoi_bitwise'] = {
  init: function() {
    var OPTIONS =
        [[Blockly.Msg.HKOI_BITWISE_AND, 'AND'],
         [Blockly.Msg.HKOI_BITWISE_OR, 'OR'],
         [Blockly.Msg.HKOI_BITWISE_XOR, 'XOR'],
         [Blockly.Msg.HKOI_BITWISE_SHL, 'SHL'],
         [Blockly.Msg.HKOI_BITWISE_SHR_SIGNED, 'SHR_SIGNED'],
         [Blockly.Msg.HKOI_BITWISE_SHR_UNSIGNED, 'SHR_UNSIGNED']];
    this.appendValueInput("value1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(OPTIONS), 'mode');
    this.appendValueInput("value2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, 'Number');
  }
};
