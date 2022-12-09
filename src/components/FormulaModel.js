import $ from 'jquery';
import { parse } from 'mathjs';

const allowedKeyCodes = {
  'Backspace': { value: 'Backspace', type: 'control' },
  'Delete': { value: 'Delete', type: 'control' },
  'ArrowLeft': { value: 'ArrowLeft', type: 'control' },
  'ArrowRight': { value: 'ArrowRight', type: 'control' },
  '+': { value: '+', type: 'operator' },
  '-': { value: '-', type: 'operator' },
  '*': { value: '*', type: 'operator' },
  'x': { value: '*', type: 'operator' },
  '/': { value: '/', type: 'operator' },
  '(': { value: '(', type: 'operator' },
  ')': { value: ')', type: 'operator' },
  ',': { value: '.', type: 'number' },
  '.': { value: '.', type: 'number' },
  '0': { value: '0', type: 'number' },
  '1': { value: '1', type: 'number' },
  '2': { value: '2', type: 'number' },
  '3': { value: '3', type: 'number' },
  '4': { value: '4', type: 'number' },
  '5': { value: '5', type: 'number' },
  '6': { value: '6', type: 'number' },
  '7': { value: '7', type: 'number' },
  '8': { value: '8', type: 'number' },
  '9': { value: '9', type: 'number' },
}

class FormulaModel {
  constructor(el, tokens = []) {
    this.el = $(el);
    this.tokensMap = {};
    tokens.forEach((token) => { this.tokensMap[token.value] = token; });
    // Regex for number greater than 9 and with precision
    // eslint-disable-next-line no-useless-escape
    this.regexStaticCustomNumber = new RegExp(/(?<!\w)\d[\s\.\d]*\d/g);

    this._insertNode('&fnof;=', 'active key');
    // Set active node on click
    this.el.on('click', () => {
      const nodes = $('.formula-input-node', this.el);
      nodes.removeClass('active').last().addClass('active');
    });
    // Bind keydown event
    this.el.on('keydown', (e) => {
      if (allowedKeyCodes[e.key]) {
        const code = allowedKeyCodes[e.key];
        if (code.type === 'control') {
          if (code.value === 'Backspace') {
            const activeNode = $('.formula-input-node.active:not(.key)', this.el);
            if (activeNode.length) {
              activeNode.prev().addClass('active');
              activeNode.remove();
            }
          } else if (code.value === 'Delete') {
            const nextNode = $('.formula-input-node.active:not(.key)', this.el).next();
            if (nextNode.length) {
              nextNode.remove();
            }
          } else if (code.value === 'ArrowLeft') {
            const activeNode = $('.formula-input-node.active', this.el);
            const prevNode = activeNode.prev();
            if (prevNode.length) {
              activeNode.removeClass('active');
              prevNode.addClass('active');
            }
          } else if (code.value === 'ArrowRight') {
            const activeNode = $('.formula-input-node.active', this.el);
            const nextNode = activeNode.next();
            if (nextNode.length) {
              activeNode.removeClass('active');
              nextNode.addClass('active');
            }
          }
        } else if (code.type === 'operator') {
          this.addOperator(code.value);
        } else if (code.type === 'number') {
          this.addNumber(code.value);
        }
      }
    });
  }

  addOperatorInput(value) {
    const operator = allowedKeyCodes[value];
    if (operator) {
      this._insertNode(operator.value, 'operator', operator.value);
    }
  }

  addOperator(operator) {
    this._insertNode(operator, 'operator', operator);
  }

  addNumber(value) {
    this._insertNode(value, 'number', value);
  }

  addToken(token) {
    const tokenEl = $(`
      <div class='input-token b-btn'>
        <span class='input-token-container'>
          <span class='input-token-label'>${token.content} </span>
          <i class='input-token-remove fa fa-times' title='Remove ${token.content}'></i>
        </span>
      </div>
    `);
    $('.input-token-remove', tokenEl).on('click', () => {
      tokenEl.parents('.formula-input-node').remove();
    });
    this._insertNode(tokenEl, 'token', token.value);
  }

  clear() {
    $('.formula-input-node:not(.key)', this.el).remove();
    $('.formula-input-node.key', this.el).addClass('active');
  }

  getFormula() {
    const formulaArray = [];
    $('.formula-input-node:not(.key)', this.el).each(function() {
      formulaArray.push($(this).data('value'));
    });
    let formula = formulaArray.join(' ');
    // eslint-disable-next-line no-useless-escape
    const findFormulaStaticNumbers = formula.match(this.regexStaticCustomNumber);
    if (findFormulaStaticNumbers) {
      findFormulaStaticNumbers.forEach((strMatch) => {
        const strMatchSpaceLess = strMatch.replace(/ +/g, '');
        formula = formula.replace(strMatch, strMatchSpaceLess);
      });
    }
    // Validate
    try {
      const explodeFormula = formula.split(' ');
      explodeFormula.forEach((value, index) => {
        // Is token
        if (this.tokensMap[value]) {
          // Prev
          if (index > 0) {
            const prevValue = explodeFormula[index - 1];
            if (!isNaN(prevValue) || this.tokensMap[prevValue]) throw new Error('Invalid formula');
          }

          // Next
          if ((index + 1) < explodeFormula.length) {
            const nextValue = explodeFormula[index + 1];
            if (!isNaN(nextValue) || this.tokensMap[nextValue]) throw new Error('Invalid formula');
          }
        }
      });
      parse(formula);
      return formula;
    } catch (err) {
      throw new Error(err.message || 'Invalid formula');
    }
  }

  setFormula(formula = '') {
    // eslint-disable-next-line no-useless-escape
    const findFormulaStaticNumbers = formula.match(this.regexStaticCustomNumber);
    if (findFormulaStaticNumbers) {
      findFormulaStaticNumbers.forEach((strMatch) => {
        const strMatchSpaceDelimit = strMatch.split('').join(' ')
        formula = formula.replace(strMatch, strMatchSpaceDelimit);
      });
    }
    const formulaArray = formula.split(' ');
    formulaArray.forEach((node) => {
      if (node !== ' ') {
        if (allowedKeyCodes[node]) {
          if (allowedKeyCodes[node].type === 'operator') {
            this.addOperator(allowedKeyCodes[node].value);
          } else if (allowedKeyCodes[node].type === 'number') {
            this.addNumber(node);
          }
        } else if (this.tokensMap[node]) {
          const token = this.tokensMap[node];
          this.addToken(token);
        }
      }
    });
  }
  
  _insertNode(html = '', className = '', dataValue = '') {
    const node = $('<div class="formula-input-node"></div>');
    if (className) node.addClass(className);
    if (dataValue) node.data('value', dataValue);
    node.html(html);
    // Set active node on click
    node.on('click', (e) => {
      e.stopPropagation();
      $('.formula-input-node', this.el).removeClass('active');
      if (e.offsetX < (node.width() / 2)) {
        // Activate Prev node
        node.prev().addClass('active');
      } else {
        // Activate actual node
        node.addClass('active');
      }
    });
    // Append after active or at end
    const activeEl = $('.formula-input-node.active', this.el);
    if (activeEl.length) {
      node.insertAfter(activeEl);
      activeEl.removeClass('active');
      node.addClass('active');
    } else {
      this.el.append(node);
    }
  }
}

export default FormulaModel;