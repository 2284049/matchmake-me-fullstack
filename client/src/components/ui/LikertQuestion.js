import React from "react";

export default function LikertQuestion(props) {
   function checkIsSelected(selectedAnswerIds, answerId) {
      return selectedAnswerIds.includes(answerId);
   }

   //  const questionTitle = props.question.questionTitle;
   //  const answers = props.question.answers;
   //  const id = props.question.id;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;
   const {
      questionTitle,
      answers,
      questionId,
      selectedAnswerIds,
   } = props.question;

   return (
      <div className="row">
         <div className="col-12 mb-1">
            <p>{questionTitle}</p>
         </div>
         {answers.map((answer) => {
            return (
               <div className="col-3" key={answer.answerId}>
                  <label
                     htmlFor={answer.answerId}
                     className="small-input-font text-center mb-7"
                  >
                     <input
                        type="radio"
                        id={answer.answerId}
                        name={questionId}
                        className="custom-control-input likert-radio mx-auto d-block"
                        value={answer.answerId}
                        checked={checkIsSelected(
                           selectedAnswerIds,
                           answer.answerId
                        )}
                        onChange={(e) => {
                           props.setData(e);
                        }}
                     />

                     {answer.answerText}
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
