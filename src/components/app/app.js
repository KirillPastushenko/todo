import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form'
import './app.css';

//const el = React.createElement('h1',null,'Hello world');


export default class App extends Component{
    maxId = 100;
    defaultOrder = 1;
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Build App'),
            this.createTodoItem('Lunch')
        ],
        term: '',
        filter: 'all'
    }; 


    createTodoItem(label){
        return {
            label,
            important:false,
            done:false,
            id:this.maxId++,
            order:this.defaultOrder++
        }
    }


    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0,idx),
                ...todoData.slice(idx+1)
            ];
            return {
                todoData:newArray
            }
        });
    }


    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            }
        })
    }
  

    toggleProp(arr,id,propName){
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]:!oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }


    toggleOrder(arr,id,direction){
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, order: oldItem.order + direction};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData:this.toggleProp(todoData,id,'important')
            }
        })
    }


    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData:this.toggleProp(todoData,id,'done')
            }
        })
    }


    onDownChange = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData:this.toggleProp(todoData,id,-1)
            }
        })
    }


    onUpChange = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData:this.toggleProp(todoData,id,1)
            }
        })
    }


    onSearchChange = (term) => {
        this.setState({term});
    }


    onFilterChange = (filter) => {
        this.setState({filter});
    }


    search(items, term){
        if(term.length === 0){
            return items;
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }


    filter(items, filter){
        switch (filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default: 
                return items
        }
 
    }


    render(){
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter
        );
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div> 
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="d-flex filters">
                    <SearchPanel onSearchChange = {this.onSearchChange} />
                    <ItemStatusFilter 
                        filter={filter}
                        onFilterChange = {this.onFilterChange}/>
                </div>
                <TodoList 
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                    onDownChange={this.onDownChange}
                    onUpChange={this.onUpChange}/>
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        )
    }
}
