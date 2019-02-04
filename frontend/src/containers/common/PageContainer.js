import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { personalActions, applyActions, interviewActions } from '../../reducers'
import validation from '../../common/validation';

class PageContainer extends Component {
  //페이지 인가 처리용

  handlePreviousButtonClick = e => {
    const { history, config } = this.props;
    history.push(config.previousRoutePath);
  };

  handleNextButtonClick = e => {
    const { match, history, config, state, staticData } = this.props;

    const actionModule = state[config.validationModuleKey].toJS();

    const validateResult = this.validateByPage(match, actionModule, staticData.validation);

    if (actionModule.validate || validateResult) {
      history.push(config.nextRoutePath);
    }
  };

  validateByPage = (match, actionModule, { required }) => {
    switch(match.path){
      case '/personalQuestions':
        const hasNotValidatedItem = required.find(row => {
            if (!validation[row.validationType](_.get(actionModule, ['fields', ...row.name.split('.')]))) {
              window.alert(row.message);
              return true;
            }
          });
        return !hasNotValidatedItem;
      case '/applyChoice':
        break;
      default:
        break;
    }
  };

  render() {
    const { pageLayout: LayoutComnent } = this.props;

    return (
      <>
        <LayoutComnent onNextButtonClick={this.handleNextButtonClick} onPreviousButtonClick={this.handlePreviousButtonClick} {...this.props} />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    personalActions: bindActionCreators(personalActions, dispatch),
    applyActions: bindActionCreators(applyActions, dispatch),
    interviewActions: bindActionCreators(interviewActions, dispatch),

  })
)(PageContainer));
