describe("taskCtrl",function () {

	var $rootScope,$scope,controller;

	beforeEach(function(){
		module('vidyartha');

		inject(function($injector) {
			$srootScope = $injector.get('$rootScope');
			$scope = $injector.get('$scope');
			controller = $injector.get('$controller')('taskCtrl',{$scope:$scope});
		});
	});

	describe("Initiliazaion",function(){
		it("Should instintiate todayTasks to an empty array",function(){
			expect($scope.todayTasks).toEqual([]);
		});
	});

	describe("Task functions",function(){

		describe("addTask",function(){

			it("Length of todayTasks should be 0",function(){
				expect($scope.todayTasks.length).toEqual(0);
			});
			
			$scope.task_functions.addTask();

			it("Length of todayTasks should be 1",function(){
				expect($scope.todayTasks.length).toEqual(1);
			});

		});
	});


});

