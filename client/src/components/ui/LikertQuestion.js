import React from "react";

export default function LikertQuestion(props) {
   function checkIsSelected(selectedAnswerIds, answerId) {
      return selectedAnswerIds.includes(answerId);
   }

   //  const title = props.question.title;
   //  const answers = props.question.answers;
   //  const id = props.question.id;
   //  const selectedAnswerIds = props.question.selectedAnswerIds;
   const { title, answers, id, selectedAnswerIds } = props.question;

   return (
      <div className="row">
         <div className="col-12 mb-1">
            <p>{title}</p>
         </div>
         {answers.map((answer) => {
            return (
               <div className="col-3" key={answer.id}>
                  <label
                     htmlFor={answer.id}
                     className="small-input-font text-center mb-7"
                  >
                     <input
                        type="radio"
                        id={answer.id}
                        name={id}
                        className="custom-control-input likert-radio mx-auto d-block"
                        value={answer.id}
                        checked={checkIsSelected(selectedAnswerIds, answer.id)}
                        onChange={(e) => {
                           props.setData(e);
                        }}
                     />

                     {answer.text}
                  </label>
               </div>
            );
         })}
         {/* {answers.map((answer) => {
            return (
               <div className="col-3" key={answer.id + "label"}>
                  <div className="d-flex justify-content-center mb-7">
                     
                  </div>
               </div>
            );
         })} */}
      </div>
   );
}
