import React from 'react';
import './todo-list-item.css';

// Без деструктуризации
//const TodoListItem = (props) => {
//    return <span>{props.label}</span>;
//};
export default class TodoListItem extends React.Component {

    render(){
        const {label, onDeleted, onToggleImportant, onToggleDone, onDownChange, onUpChange, important, done} = this.props;
 
        let classNames = 'todo-list-item ';
        if(done) {
            classNames += ' done';
        }
        if(important) {
            classNames += ' important';
        }
        return (
            <span className={classNames}>
                <span className="todo-list-item-label" 
                onClick = {onToggleDone }>
                    {label} 
                </span>
                <button type="button" className="btn btn-outline-success btn-sm" onClick={onToggleImportant}>
                    <i className="fa fa-exclamation"/>
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={onDeleted}>
                    <i className="fa fa-trash-o"/>
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onDownChange}>
                    <i className="fa fa-angle-down"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onUpChange}>
                    <i className="fa fa-angle-up"></i>
                </button>

            </span> 
        );
    }
}


 
 