import React from "react";

export default function RadioQuestion(props) {
   const {
      questionTitle,
      answerChoices,
      questionId,
      selectedAnswerIds,
   } = props.question;

   function checkIsSelected(selectedAnswerIds, answerChoiceId) {
      return selectedAnswerIds.includes(answerChoiceId);
   }

   //  const questionTitle = props.question.questionTitle;
   //  const answerChoices = props.question.answerChoices;
   //  const questionId = props.question.questionId;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;

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
                     key={answer.answerChoiceId}
                  >
                     <div className="custom-control custom-radio d-inline">
                        <input
                           type="radio"
                           id={answer.answerChoiceId}
                           name={questionId}
                           value={answer.answerChoiceId}
                           className="custom-control-input"
                           checked={checkIsSelected(
                              selectedAnswerIds,
                              answer.answerChoiceId
                           )}
                           onChange={(e) => {
                              props.setData(e);
                           }}
                        />
                        <label
                           className="custom-control-label"
                           htmlFor={answer.answerChoiceId}
                        >
                           {answer.answerChoiceText}
                        </label>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
}
