// import React from "react";
// import ChevronDownScreen from "../../filterComponents/formFilter/FilterIconComponents/filterIcon";
// import "../formFilter/filterDropDown.css";

// import PropTypes from "prop-types";

// import { useReducer } from "react";

// import { ChevronUp } from "./ChevronUp";
// import { Option } from "./Option";


// export const Select = ({
//     isRequired = false,
//     showLabel = true,
//     label = "Label",
//     showLeadingIcon = false,
//     stateProp,
//     isCompact,
// }) => {
//     const [state, dispatch] = useReducer(reducer, {
//         state: stateProp || "default",

//         isCompact: isCompact || true,
//     });

//     return (
//         <div
//             className="select"
//             onClick={() => {
//                 dispatch("click");
//             }}
//         >
//             <div className="select-input">
//                 {showLabel && (
//                     <div className="label-wrapper">
//                         <div className="text-wrapper">{label}</div>
//                     </div>
//                 )}

//                 <div className={`input ${state.state}`}>
//                     <div className="div">
//                         {state.state === "focus" && <div className="caret" />}

//                         <div className="text-wrapper-2">Select</div>
//                     </div>

//                     {state.state === "focus" && <ChevronUp className="instance-node" />}

//                     {state.state === "default" && (
//                         <ChevronDownScreen className="instance-node" />
//                     )}
//                 </div>
//             </div>

//             {state.state === "focus" && (
//                 <div className="options">
//                     <Option
//                         className="option-instance"
//                         isSelected={false}
//                         label="Label"
//                         type="default"
//                     />
//                     <Option
//                         className="option-instance"
//                         isSelected={false}
//                         label="Label"
//                         type="default"
//                     />
//                     <Option
//                         className="option-instance"
//                         isSelected={false}
//                         label="Label"
//                         type="default"
//                     />
//                     <Option
//                         className="option-instance"
//                         isSelected={false}
//                         label="Label"
//                         type="default"
//                     />
//                     <Option
//                         className="option-instance"
//                         isSelected={false}
//                         label="Label"
//                         type="default"
//                     />
//                     <Option
//                         className="option-instance"
//                         isSelected={false}
//                         label="Label"
//                         type="default"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// function reducer(state, action) {
//     switch (action) {
//         case "click":
//             return {
//                 ...state,
//                 state: "default",
//             };
//     }

//     return state;
// }

// Select.propTypes = {
//     isRequired: PropTypes.bool,
//     showLabel: PropTypes.bool,
//     label: PropTypes.string,
//     showLeadingIcon: PropTypes.bool,
//     stateProp: PropTypes.oneOf(["focus", "default"]),
//     isCompact: PropTypes.bool,
// };
