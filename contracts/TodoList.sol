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

    function createTodos(string calldata _title, string calldata _description, uint _dueDate) external {
        todoList.push(Todo({id : taskId++, title : _title, description :_description, isDone : false, createdDate : block.timestamp,   dueDate : _dueDate, status : Status.InProgress}));
    }

    function checkTodoLength() external view returns(uint){
            return todoList.length;
    }

    function fetchAllTodos() external view returns (Todo[] memory _todoList){
        _todoList = todoList;
    }
    function deleteTodo(uint8 index) external {
        require(index <= todoList.length, "Invalid input");
        // todoList[index] = 
    }
   
}