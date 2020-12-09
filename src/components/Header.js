import React from "react";

// stateless component ES6
// implicit return
const Header = (props, i) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        of
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

// stateless component ES6
// implicit return
// multiple props split outs
// const Header = ({tagline, age}) => (
//     <header className="top">
//       <h1>
//         Catch
//         <span className="ofThe">
//           of
//           <span className="of">of</span>
//           <span className="the">the</span>
//         </span>
//         day
//       </h1>
//       <h3 className="tagline">
//         <span>{tagline}{age}</span>
//       </h3>
//     </header>
//   );

// stateless component regular JS
// function Header(props) {
//   return (
//     <header className="top">
//       <h1>
//         Catch
//         <span className="ofThe">
//           of
//           <span className="of">of</span>
//           <span className="the">the</span>
//         </span>
//         day
//       </h1>
//       <h3 className="tagline">
//         <span>{props.tagline}</span>
//       </h3>
//     </header>
//   );
// }

// full component
// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             of
//             <span className="of">of</span>
//             <span className="the">the</span>
//           </span>
//           day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

export default Header;
