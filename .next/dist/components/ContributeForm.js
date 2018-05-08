'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _campaign = require('../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mkoistinen/dev/kickstart/components/ContributeForm.js';


var ContributeForm = function (_Component) {
  (0, _inherits3.default)(ContributeForm, _Component);

  function ContributeForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ContributeForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ContributeForm.__proto__ || (0, _getPrototypeOf2.default)(ContributeForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: '',
      errorMessage: '',
      loading: false
    }, _this.onSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var accounts, campaign, wei, minimumContribution;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                _context.next = 3;
                return _web2.default.eth.getAccounts();

              case 3:
                accounts = _context.sent;
                campaign = (0, _campaign2.default)(_this.props.address);
                wei = _web2.default.utils.toWei(_this.state.value, 'ether');
                _context.next = 8;
                return campaign.methods.minimumContribution().call();

              case 8:
                minimumContribution = _context.sent;

                _this.setState({ loading: true, errorMessage: '' });

                _context.prev = 10;

                if (!(isNaN(wei) || wei < minimumContribution)) {
                  _context.next = 13;
                  break;
                }

                throw "The Minimum Contribution is " + minimumContribution + " wei";

              case 13:
                _context.next = 15;
                return campaign.methods.contribute().send({
                  from: accounts[0],
                  value: wei
                });

              case 15:
                _routes.Router.replaceRoute('/campaigns/' + _this.props.address);
                _context.next = 22;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](10);

                console.log(_context.t0);
                _this.setState({ errorMessage: _context.t0.message || _context.t0 });

              case 22:

                _this.setState({ loading: false });

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[10, 18]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ContributeForm, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, 'Amount to contribute'), _react2.default.createElement(_semanticUiReact.Input, {
        value: this.state.value,
        onChange: function onChange(event) {
          return _this3.setState({ value: event.target.value });
        },
        label: 'ether',
        labelPosition: 'right',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: 'Oops', content: this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { primary: true, loading: this.state.loading, __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, 'Contribute!')));
    }
  }]);

  return ContributeForm;
}(_react.Component);

exports.default = ContributeForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udHJpYnV0ZUZvcm0uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJCdXR0b24iLCJGb3JtIiwiSW5wdXQiLCJNZXNzYWdlIiwiQ2FtcGFpZ24iLCJ3ZWIzIiwiUm91dGVyIiwiQ29udHJpYnV0ZUZvcm0iLCJzdGF0ZSIsInZhbHVlIiwiZXJyb3JNZXNzYWdlIiwibG9hZGluZyIsIm9uU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImV0aCIsImdldEFjY291bnRzIiwiYWNjb3VudHMiLCJjYW1wYWlnbiIsInByb3BzIiwiYWRkcmVzcyIsIndlaSIsInV0aWxzIiwidG9XZWkiLCJtZXRob2RzIiwibWluaW11bUNvbnRyaWJ1dGlvbiIsImNhbGwiLCJzZXRTdGF0ZSIsImlzTmFOIiwiY29udHJpYnV0ZSIsInNlbmQiLCJmcm9tIiwicmVwbGFjZVJvdXRlIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJ0YXJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFRLEFBQU0sQUFBTzs7QUFDOUIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTLEFBQWM7Ozs7Ozs7SUFFakIsQTs7Ozs7Ozs7Ozs7Ozs7OzROLEFBQ0o7YUFBUSxBQUNDLEFBQ1A7b0JBRk0sQUFFUSxBQUNkO2VBSE0sQSxBQUdHO0FBSEgsQUFDTixhLEFBS0Y7MkZBQVcsaUJBQUEsQUFBTyxPQUFQO3FDQUFBO3NFQUFBO29CQUFBOzZDQUFBO21CQUNUO3NCQURTLEFBQ1QsQUFBTTtnQ0FERzt1QkFFYyxjQUFBLEFBQUssSUFGbkIsQUFFYyxBQUFTOzttQkFBMUI7QUFGRyxvQ0FHSDtBQUhHLDJCQUdRLHdCQUFTLE1BQUEsQUFBSyxNQUh0QixBQUdRLEFBQW9CLEFBQy9CO0FBSkcsc0JBSUcsY0FBQSxBQUFLLE1BQUwsQUFBVyxNQUFNLE1BQUEsQUFBSyxNQUF0QixBQUE0QixPQUovQixBQUlHLEFBQW1DO2dDQUp0Qzt1QkFLeUIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsc0JBTDFDLEFBS3lCLEFBQXVDOzttQkFBbkU7QUFMRywrQ0FPVDs7c0JBQUEsQUFBSyxTQUFTLEVBQUUsU0FBRixBQUFXLE1BQU0sY0FQdEIsQUFPVCxBQUFjLEFBQStCOztnQ0FQcEM7O3NCQVVILE1BQUEsQUFBTSxRQUFRLE1BVlgsQUFVaUIsc0JBVmpCO2tDQUFBO0FBQUE7QUFBQTs7c0JBV0MsaUNBQUEsQUFBaUMsc0JBWGxDLEFBV3dEOzttQkFYeEQ7Z0NBQUE7Z0NBYUQsQUFBUyxRQUFULEFBQWlCLGFBQWpCLEFBQThCO3dCQUM1QixTQURpQyxBQUNqQyxBQUFTLEFBQ2Y7eUJBZkssQUFhRCxBQUFtQyxBQUVoQztBQUZnQyxBQUN2QyxpQkFESTs7bUJBSU47K0JBQUEsQUFBTyw2QkFBMkIsTUFBQSxBQUFLLE1BakJoQyxBQWlCUCxBQUE2QztnQ0FqQnRDO0FBQUE7O21CQUFBO2dDQUFBO2dEQW9CUDs7d0JBQUEsQUFBUSxhQUNSO3NCQUFBLEFBQUssU0FBUyxFQUFFLGNBQWMsWUFBQSxBQUFJLG9CQXJCM0IsQUFxQlAsQUFBYzs7bUJBR2hCOztzQkFBQSxBQUFLLFNBQVMsRUFBRSxTQXhCUCxBQXdCVCxBQUFjLEFBQVc7O21CQXhCaEI7bUJBQUE7Z0NBQUE7O0FBQUE7a0NBQUE7QTs7Ozs7Ozs7Ozs2QkEyQkQ7bUJBQ1I7OzZCQUNFLEFBQUMsdUNBQUssVUFBVSxLQUFoQixBQUFxQixVQUFVLE9BQU8sQ0FBQyxDQUFDLEtBQUEsQUFBSyxNQUE3QyxBQUFtRDtvQkFBbkQ7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0csY0FBRCxzQkFBQSxBQUFNOztvQkFBTjtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FERixBQUNFLEFBQ0EseUNBQUEsQUFBQztlQUNRLEtBQUEsQUFBSyxNQURkLEFBQ29CLEFBQ2xCO2tCQUFVLHlCQUFBO2lCQUFTLE9BQUEsQUFBSyxTQUFTLEVBQUUsT0FBTyxNQUFBLEFBQU0sT0FBdEMsQUFBUyxBQUFjLEFBQXNCO0FBRnpELEFBR0U7ZUFIRixBQUdRLEFBQ047dUJBSkYsQUFJZ0I7O29CQUpoQjtzQkFGRixBQUVFLEFBTUE7QUFOQTtBQUNFLDBCQUtGLEFBQUMsMENBQVEsT0FBVCxNQUFlLFFBQWYsQUFBc0IsUUFBTyxTQUFTLEtBQUEsQUFBSyxNQUEzQyxBQUFpRDtvQkFBakQ7c0JBUkYsQUFRRSxBQUNBO0FBREE7MEJBQ0EsQUFBQyx5Q0FBTyxTQUFSLE1BQWdCLFNBQVMsS0FBQSxBQUFLLE1BQTlCLEFBQW9DO29CQUFwQztzQkFBQTtBQUFBO1NBWE4sQUFDRSxBQUNFLEFBU0UsQUFJUDs7Ozs7QUFsRDBCLEEsQUFxRDdCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkNvbnRyaWJ1dGVGb3JtLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ta29pc3RpbmVuL2Rldi9raWNrc3RhcnQifQ==