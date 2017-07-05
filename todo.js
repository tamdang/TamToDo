var module = angular.module('todoApp', [])

module.controller('TodoListController', ['$scope','Todo', function(scope, Todo){
  scope.$on('todos.add', function( event ) {
    scope.todos = Todo.todos
    console.log(scope.todos)
  })
  scope.todos = Todo.todos
}])

module.directive( "addTodo", [ 'Todo', function(Todo) {
   return {
     restrict: "A",
     link: function( scope, element, attrs ) {
       element.on('click', function() {
         Todo.addTodo( {text: 'do 1', selected: false, done: false}, )
       });
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
