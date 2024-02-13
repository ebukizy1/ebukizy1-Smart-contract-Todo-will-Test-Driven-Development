import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";


describe.only("TodoList", async ()=>{

    const deployTodoList = async ()=> {
         const todoTitle = "my python Course";
         const todoDescription = "all my python course";
         const dueDate = 1111;
        const [owner] = await ethers.getSigners();
        const TodoList = await ethers.getContractFactory("TodoList");
        const todoList = await TodoList.deploy();

        return {todoList, todoTitle, todoDescription, dueDate}
    }

    describe("Deployment", async ()=> {

        it("test contract can be deployed", async ()=>{
            const {todoList} = await loadFixture(deployTodoList);
            expect(todoList).to.exist;
        });


    it("test that todo can be created", async()=>{
    const {todoList,todoTitle, todoDescription, dueDate} = await loadFixture(deployTodoList);
       await todoList.createTodos(todoTitle, todoDescription, dueDate);
       expect(await todoList.checkTodoLength()).to.equal(1);
    });


    it("test that 2 todos can be create ",  async ()=>{
    const {todoList,todoTitle, todoDescription, dueDate} = await loadFixture(deployTodoList);
    const { todoTitle: todoTitle2, todoDescription: todoDescription2, dueDate: dueDate2 } = await loadFixture(deployTodoList);
    await todoList.createTodos(todoTitle, todoDescription, dueDate);
    await todoList.createTodos(todoTitle2, todoDescription2, dueDate2);
    expect(await todoList.checkTodoLength()).to.equal(2);
    });


    it("test that all the todos can be fetch ", async ()=>{
        const {todoList,todoTitle, todoDescription, dueDate} = await loadFixture(deployTodoList);
        const { todoTitle: todoTitle2, todoDescription: todoDescription2, dueDate: dueDate2 } = await loadFixture(deployTodoList);
        await todoList.createTodos(todoTitle, todoDescription, dueDate);
        await todoList.createTodos(todoTitle2, todoDescription2, dueDate2);
        const result = await todoList.fetchAllTodos();
        expect(result.length).to.equal(2);
    });

    it("test that all todo can be delete", async ()=>{
        const {todoList,todoTitle, todoDescription, dueDate} = await loadFixture(deployTodoList);
        const { todoTitle: todoTitle2, todoDescription: todoDescription2, dueDate: dueDate2 } = await loadFixture(deployTodoList);
        await todoList.createTodos(todoTitle, todoDescription, dueDate);
        await todoList.createTodos(todoTitle2, todoDescription2, dueDate2);
        expect(await todoList.checkTodoLength()).to.equal(2);
        await todoList.deleteTodo(0);
        expect(await todoList.checkTodoLength()).to.equal(1);


    })

});
    

});
