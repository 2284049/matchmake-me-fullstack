import React from "react";

export default function RadioQuestion(props) {
   function checkIsSelected(selectedAnswerIds, answerId) {
      return selectedAnswerIds.includes(answerId);
   }

   //  const title = props.question.title;
   //  const answers = props.question.answers;
   //  const id = props.question.id;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;
   const { title, answers, id, selectedAnswerIds } = props.question;

   return (
      <>
         <div className="row mb-7">
            <div className="col-12 mb-1">
               <p>{title}</p>
            </div>
            {answers.map((answer) => {
               return (
                  <div
                     className="col-12 col-sm-4 col-md-3 col-lg-2 col-xl-3"
                     key={answer.id}
                  >
                     <div className="custom-control custom-radio d-inline">
                        <input
                           type="radio"
                           id={answer.id}
                           name={id}
                           value={answer.id}
                           className="custom-control-input"
                           checked={checkIsSelected(
                              selectedAnswerIds,
                              answer.id
                           )}
                           onChange={(e) => {
                              props.setData(e);
                           }}
                        />
                        <label
                           className="custom-control-label"
                           htmlFor={answer.id}
                        >
                           {answer.text}
                        </label>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
}
