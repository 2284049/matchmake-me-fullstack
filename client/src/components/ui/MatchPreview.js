import React from "react";
import { Link } from "react-router-dom";
import actions from "../../store/actions";
import { connect } from "react-redux";

class MatchPreview extends React.Component {
   storeSelectedMatch() {
      console.log("STORING_SELECTED_MATCH");
      this.props.dispatch({
         type: actions.STORE_SELECTED_MATCH,
         payload: this.props.match,
      });
   }

   render() {
      return (
         <>
            <div className="col-12 mb-9">
               {/* col-sm-6 */}
               <Link
                  to="/match"
                  onClick={() => {
                     this.storeSelectedMatch();
                  }}
               >
                  <img
                     src={this.props.match.verifyPhotoUrl}
                     width="100%"
                     height="auto"
                     style={{ borderRadius: "0.75rem" }}
                     alt="Match"
                  />
                  <h3 className="text-center">{this.props.match.username}</h3>
                  <h4 className="text-center">
                     match score: {this.props.match.score}
                  </h4>
               </Link>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
            </div>
         </>
      );
   }
}

function mapStateToProps(state) {
   //global state
   return {};
}
export default connect(mapStateToProps)(MatchPreview);
