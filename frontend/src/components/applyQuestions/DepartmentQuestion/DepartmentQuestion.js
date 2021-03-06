import React from 'react';

import classNames from 'classnames/bind';
import styles from './DepartmentQuestion.scss';
import { SectionTitle, SubsectionHeader } from '../../common';
import AnswerArea from '../AnswerArea';
import FileUploadForm from '../FileUploadForm';
import TechSelectForm from '../TechSelectForm';

const cx = classNames.bind(styles);

const DepartmentQuestion = ({ questionModules, answers, onInputChange }) => {

  const answerFormByType = (answerType, index, questionClassId, answer, onInputChange) => {
    switch (answerType) {
      case 'text':
        return (
          <AnswerArea
            type={'department'}
            index={index}
            questionClassId={questionClassId}
            answer={answer ? answer.text : ''}
            onInputChange={onInputChange}
          />

        )
      case 'file':
        return (
          <>
            <AnswerArea
              type={'department'}
              index={index}
              questionClassId={questionClassId}
              answer={answer ? answer.text : ''}
              onInputChange={onInputChange}
            />
            <FileUploadForm
              type={'department'}
              index={index}
              questionClassId={questionClassId}
              answer={answer ? answer.file : null}
              onInputChange={onInputChange}
            />
          </>
        )
      case 'select':
        return (
          <>
            <TechSelectForm
              type={'department'}
              index={index}
              questionClassId={questionClassId}
              answer={answer ? answer.select : null}
              onInputChange={onInputChange}
            />
            <AnswerArea
              type={'department'}
              index={index}
              questionClassId={questionClassId}
              answer={answer ? answer.text : ''}
              onInputChange={onInputChange}
            />
          </>
        )
      default:
        break;
    }
  }

  const componentByModule = (questionModule, index) => {
    const { department, team, rank, questions, questionClassId } = questionModule;
    return (
      <div key={index} className={cx('department-question-form')}>
        <div className={cx('department-title')}>
          {rank}지망: {`${department} ${team === '' ? '' : `(${team})`}`}
        </div>
        <div>
          {questions.map(({ question, answerType, isTeamQuestion }, questionIndex) => (
            <div key={`${index}__${questionIndex}`} className={cx('department-answer-form')}>
              <SubsectionHeader title={`Q. ${question} ${isTeamQuestion ? '(팀 질문)' : '(본부 공통 질문)'}`} />
              {answerFormByType(
                answerType,
                questionIndex,
                questionClassId,
                answers[questionClassId] ? answers[questionClassId][questionIndex] : '',
                onInputChange)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <SectionTitle title='모집 단위별 질문' />
      <div>
        {questionModules.map((questionModule, index) => componentByModule(questionModule, index))}
      </div>
    </>
  )
}

export default DepartmentQuestion;
