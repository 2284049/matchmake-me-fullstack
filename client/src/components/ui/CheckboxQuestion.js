import React from "react";

export default function CheckboxQuestion(props) {
   function checkIsSelected(selectedAnswerIds, answerId) {
      return selectedAnswerIds.includes(answerId);
   }

   //  const title = props.question.title;
   //  const answers = props.question.answers;
   //  const id = props.question.id;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;
   const { title, answers, id, selectedAnswerIds } = props.question;

   return (
      <div className="row mb-7">
         <div className="col-12 mb-1">
            <p>{title}</p>
         </div>
         {answers.map((answer) => {
            return (
               <div className="col-xs-12 col-sm-6" key={answer.id}>
                  <div className="custom-control custom-checkbox">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id={answer.id}
                        checked={checkIsSelected(selectedAnswerIds, answer.id)}
                        name={id}
                        value={answer.id}
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
   );
}
