// impt = import prop types
//  rafce = quick React function snippet

import PropTypes from 'prop-types';
import Button from './Button';

//Styling can be done inline, but needs double curly braces

// const Header = (props) => {
//     return (
//         <header>
//             <h1 style={{color: 'red', backgroundColor: 'black'}}>{props.title}</h1>
//         </header>
//     )
// }

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

//Destructured 

// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>
//         </header>
//     )
// }

// Header.defaultProps = {
//     title: 'Task Tracker'
// }



//CSS IN JS

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header
