import React from "react";

export default function RadioQuestion(props) {
   // function checkIsSelected(selectedAnswerIds, answerId) {
   //    return selectedAnswerIds.includes(answerId);
   // }

   //  const questionTitle = props.question.questionTitle;
   //  const answerChoices = props.question.answerChoices;
   //  const questionId = props.question.questionId;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;
   const {
      questionTitle,
      answerChoices,
      questionId,
      selectedAnswerIds,
   } = props.question;

   return (
      <>
         <div className="row mb-7">
            <div className="col-12 mb-1">
               <p>{questionTitle}</p>
            </div>
            {answerChoices.map((answer) => {
               return (
                  <div
                     className="col-12 col-sm-4 col-md-3 col-lg-2 col-xl-3"
                     key={answer.answerId}
                  >
                     <div className="custom-control custom-radio d-inline">
                        <input
                           type="radio"
                           id={answer.answerId}
                           name={questionId}
                           value={answer.answerId}
                           className="custom-control-input"
                           // checked={checkIsSelected(
                           //    selectedAnswerIds,
                           //    answer.answerId
                           // )}
                           // onChange={(e) => {
                           //    props.setData(e);
                           // }}
                        />
                        <label
                           className="custom-control-label"
                           htmlFor={answer.answerId}
                        >
                           {answer.answerText}
                        </label>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
}
