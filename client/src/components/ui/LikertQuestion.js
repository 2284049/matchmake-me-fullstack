import React from "react";

export default function LikertQuestion(props) {
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
   //  const id = props.question.id;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;

   return (
      <div className="row">
         <div className="col-12 mb-1">
            <p>{questionTitle}</p>
         </div>
         {answerChoices.map((answer) => {
            return (
               <div className="col-3" key={answer.answerChoiceId}>
                  <label
                     htmlFor={answer.answerChoiceId}
                     className="small-input-font text-center mb-7"
                  >
                     <input
                        type="radio"
                        id={answer.answerChoiceId}
                        name={questionId}
                        className="custom-control-input likert-radio mx-auto d-block"
                        value={answer.answerChoiceId}
                        checked={checkIsSelected(
                           selectedAnswerIds,
                           answer.answerChoiceId
                        )}
                        onChange={(e) => {
                           props.setData(e);
                        }}
                     />

                     {answer.answerChoiceText}
                  </label>
               </div>
            );
         })}
         {/* {answers.map((answer) => {
            return (
               <div className="col-3" key={answer.answerId + "label"}>
                  <div className="d-flex justify-content-center mb-7">
                     
                  </div>
               </div>
            );
         })} */}
      </div>
   );
}
