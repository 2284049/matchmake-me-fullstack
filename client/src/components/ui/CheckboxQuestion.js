import React from "react";

export default function CheckboxQuestion(props) {
   const {
      questionTitle,
      answerChoices,
      questionId,
      selectedAnswerIds,
      questionLimit,
   } = props.question;

   function checkIsSelected(selectedAnswerIds, answerChoiceId) {
      return selectedAnswerIds.includes(answerChoiceId);
   }

   function checkIsValidNumberOfSelectedAnswers(
      e,
      selectedAnswerIds,
      questionLimit,
      answerChoiceId
   ) {
      if (questionLimit === 0) {
         props.setData(e);
      }
      if (
         selectedAnswerIds.length === questionLimit &&
         selectedAnswerIds.includes(answerChoiceId)
      ) {
         props.setData(e);
      }
      if (selectedAnswerIds.length === questionLimit) {
         // return message "You can only choose {questionLimit}."
      } else {
         props.setData(e);
      }
   }

   return (
      <div className="row mb-7">
         <div className="col-12 mb-1">
            <p>{questionTitle}</p>
         </div>
         {answerChoices.map((answer) => {
            return (
               <div className="col-xs-12 col-sm-6" key={answer.answerChoiceId}>
                  <div className="custom-control custom-checkbox">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id={answer.answerChoiceId}
                        checked={checkIsSelected(
                           selectedAnswerIds,
                           answer.answerChoiceId
                        )}
                        name={questionId}
                        value={answer.answerChoiceId}
                        // onChange={(e) => {
                        //    props.setData(e);
                        // }}
                        onChange={(e) => {
                           checkIsValidNumberOfSelectedAnswers(
                              e,
                              selectedAnswerIds,
                              questionLimit,
                              answer.answerChoiceId
                           );
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
   );
}
