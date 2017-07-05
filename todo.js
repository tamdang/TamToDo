angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = []
    todoList.isAllSelected = false
    todoList.isAddFormShown = false
    todoList.isAnySelected = false

    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    todoList.selectChanged = () => {
      var any = false
      var all = true
      angular.forEach(todoList.todos, todo=>{
        any = todo.selected ? true : any
        all = todo.selected ? all : false
      })
      todoList.isAnySelected = any
      todoList.isAllSelected = all
    }

    todoList.removeTodo = () => {
      todoList.todos = todoList.todos.filter(todo=>!todo.selected)
      todoList.isAnySelected = false
    }

    todoList.showAddForm = () => {
      todoList.isAddFormShown = ! todoList.isAddFormShown
    }

    todoList.selectAll = () => {
      angular.forEach(todoList.todos, function(todo) {
        todo.selected = todoList.isAllSelected
      })
      todoList.isAnySelected = todoList.isAllSelected && (todoList.todos.length > 0)
    }

    todoList.toggle = (todo) => {
      todo.done = !todo.done
    }

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
