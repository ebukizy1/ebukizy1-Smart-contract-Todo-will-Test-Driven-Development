// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract TodoList {

    Todo [] private todoList;
    uint8 private taskId;



    enum Status{ InProgress, Completed, OverDue}
 
    struct Todo {
        uint8 id;
        string title;
        string description;
        bool isDone;
        uint createdDate;
        uint dueDate;
        Status status;
    }
    event updatedTodoEvent(string indexed title, string indexed description );


    modifier validateIndexed(uint8 _index) {
     require(_index <= todoList.length, "Invalid input");
     _;     
    }


    function createTodos(string calldata _title, string calldata _description, uint _dueDate) external {
        todoList.push(Todo({id :uint8(todoList.length), title : _title, description :_description, isDone : false, createdDate : block.timestamp,   dueDate : _dueDate, status : Status.InProgress}));
    }

    function checkTodoLength() external view returns(uint){
            return todoList.length;
    }

    function fetchAllTodos() external view returns (Todo[] memory _todoList){
        _todoList = todoList;
    }

    function deleteTodo(uint8 _index) external validateIndexed(_index) {
        require(_index <= todoList.length, "Invalid input");
        todoList[_index] = todoList[todoList.length - 1];
        todoList.pop();
    }

    function updateTodos(uint8 _id, string calldata _updatedTitle,string calldata _updatedDescription,uint _updatedDated) 
    public validateIndexed(_id){
        Todo memory foundTodo = todoList[_id];
        foundTodo.title = _updatedTitle;
        foundTodo.description =_updatedDescription;
        foundTodo.dueDate = _updatedDated;
        emit updatedTodoEvent(foundTodo.title, foundTodo.description);
    }

    
   
}