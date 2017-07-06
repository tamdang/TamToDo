var module = angular.module('todoApp', [])

module.controller('TodoListController', ['$scope','Todo', function(scope, Todo){
  scope.$on('todos.add', (e) => scope.todos = Todo.todos)
  scope.$on('todos.remove', (e) => {
    scope.todos = Todo.todos
    scope.$apply()
  })

  scope.todos = Todo.todos
  scope.todoText = ''
  scope.isAddingTodo = false
  scope.isAnySelected = false
  scope.isAllSelected = false

  scope.toggleAddingTodo = function(){
    scope.isAddingTodo = ! scope.isAddingTodo
  }

  scope.toggleTodo = function(todo){
    todo.done = !todo.done
  }

  scope.saveTodo = function(){
    Todo.addTodo({text: scope.todoText, selected: false, done: false})
    scope.todoText = ''
  }

  scope.selectChanged = function(){
    var any = false
    var all = true
    angular.forEach(scope.todos, todo=>{
      any = todo.selected ? true : any
      all = todo.selected ? all : false
    })
    scope.isAnySelected = any
    scope.isAllSelected = all
  }

  scope.selectAll = function(){
    angular.forEach(scope.todos, function(todo) {
      todo.selected = scope.isAllSelected
    })
    scope.isAnySelected = scope.isAllSelected && (scope.todos.length > 0)
  }

}])

module.directive( "addTodo", [ 'Todo', function(Todo) {
   return {
     restrict: "E",
     templateUrl: 'newTodo.html'
   }
}])

module.directive( "toggleTodo", [ 'Todo', function(Todo) {
   return {
     restrict: "A",
     link: function(scope, element, attributes){
       element.on('click', function() {
         todo.done = !todo.done
       })
     }
   }
}])

module.directive( "remove", [ 'Todo', function(Todo) {
   return {
     restrict: "A",
     link: function(scope, element, attributes){
       element.on('click', function() {
         scope.isAnySelected = false
         scope.isAllSelected = false
         Todo.removeTodo()
       })
     }
   }
}])

module.factory('Todo',['$rootScope', function($rootScope){
  var Todo = new Object()
  Todo.todos = [
    {text: 'do 1', selected: false, done: false},
    {text: 'do 2', selected: false, done: false}
  ]
  Todo.addTodo = function(todo){
    Todo.todos.push(todo)
    $rootScope.$broadcast('todos.add')
  }
  Todo.toggleTodo = function(todo, select){
    angular.forEach(this.todos, (td)=>{
      if(td == todo){
        td.selected = select
      }
    })
  }
  Todo.removeTodo = function(){
    Todo.todos = Todo.todos.filter(todo=>!todo.selected)
    $rootScope.$broadcast('todos.remove')
  }
  return Todo
}])
