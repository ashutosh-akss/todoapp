/**
* @ngdoc object
* @name Vidyartha
* @description
*
* Main Angular app for TODO
*/
angular.module('vidyartha',['angularMoment'])

/**
* @ngdoc controller
* @name Vidyartha.controller:taskCtrl
* @description
*
* taskCtrl is the main controller of Todo app
*
*/
.controller('taskCtrl',['$scope','localDB','$window',function($scope,localDB,$window){
	
	$scope.todayTasks = localDB.fetch();
	$scope.task = '';
	/**
    * @ngdoc object
    * @name Vidyartha.controller.taskCtrl.task_functions
    * @description
    *
    * Object contains all methods related to tasks
    *
    */
	$scope.task_functions = {
		/**
        * @ngdoc method
        * @name Vidyartha.controller.taskCtrl.task_functions.method:addTask
        * @methodOf Vidyartha.controller.taskCtrl.task_functions
        * @param {Object} $event Enter event triggered from textbox 
        * @description
        *
        * Creates New Task
        *
        */
		addTask:function($event){

			if($event.keyCode !=13)
				return;
			
			if(!$scope.task.length)
				return $window.toastr.error("Please enter a task","Task Not Added");

			localDB.create($scope.task);
			$scope.task = ''; // clearing text box
			$window.toastr.success("Task Added sucessfully","Task Added");

		},/*addTask*/

		/**
        * @ngdoc method
        * @name Vidyartha.controller.taskCtrl.task_functions.method:updateTask
        * @methodOf Vidyartha.controller.taskCtrl.task_functions
        * @param {Object} task task object
        * @description
        *
        * Updates Existing task
        *
        */
		updateTask:function(task){
			localDB.update(task);
		},/*updateTask*/

		/**
        * @ngdoc method
        * @name Vidyartha.controller.taskCtrl.task_functions.method:deleteTask
        * @methodOf Vidyartha.controller.taskCtrl.task_functions
        * @param {Object} task task object
        * @description
        *
        * Deletes current task after showing user confirmation
        *
        */
		deleteTask:function(task){

			$window.jQuery.confirm({
			    title: 'Confirm Delete!',
			    content: 'Are you sure want to delete this task',
			    confirm: function(){
			        localDB.delete(task);
					$scope.$apply();
			    }
			});
			
		},/*deleteTask*/

	};/*task_functions*/

	/**
    * @ngdoc object
    * @name Vidyartha.controller.taskCtrl.util_functions
    * @description
    *
    * Object contains all utility functions
    *
    */
	$scope.util_functions = {
		/**
        * @ngdoc method
        * @name Vidyartha.controller.taskCtrl.util_functions.method:isTimstampToday
        * @methodOf Vidyartha.controller.taskCtrl.util_functions
        * @param {timestamp} timestamp timestamp in unix timestamp format
        * @returns {String} String String TODAY, PAST, FUTURE
        * @description
        *
        *checks whether timestamp date is today or in past or future
        */
		isTimstampToday:function(timestamp){	

			 var days = moment().diff((parseInt(timestamp) * 1000),'days');

			 switch(true){
			 	case (days == 0):
			 		return 'TODAY';
			 	case ( days> 0):
			 		return 'PAST';
			 	case (days < 0):
			 		return 'FUTURE';
			 }

		}/*isTimstampToday*/

	}/*util_functions*/


}])

/**
* @ngdoc directive
* @name Vidyartha.taskRow
* @description
* Simulates database CRUD functions using localstorage
*/
.directive("taskRow",[function(){
	return {
		restrict:'E',
		templateUrl:'assets/js/directives/task-row.html',
	}
}])

/**
* @ngdoc service
* @name Vidyartha.localDB
* @requires $q
* @description
* Simulates database CRUD functions using localstorage
*/
.factory('localDB',['$q',function($q){
	
	var dbName = "taskDB";

	return {

		taskList:[],

		lastInsertedRecord:{},
		/**
		* @ngdoc method
		* @name Vidyartha.localDB.sync
		* @methodOf Vidyartha.localDB
        * @param {String} db_name database name
        * @description
        * Saves taskList array into localstorage, this functions is called after every crud operation
        */
		sync:function(db_name){

			// Use user selected name or "taskDB"
			var db_name = db_name || dbName;

			localStorage.setItem(db_name,JSON.stringify(this.taskList));
		},
		/**
		* @ngdoc method
		* @name Vidyartha.localDB.create
		* @methodOf Vidyartha.localDB
        * @param {String} task task object
        * @description
        * Created a new task and saves in localstorage
        */
		create:function(task){
			
			this.lastInsertedRecord = {
				task_id:this.getCurrentTimestamp(),
				task:task,
				completed:false
			}

			this.taskList.push(this.lastInsertedRecord);

			this.sync();
		},
		/**
		* @ngdoc method
		* @name Vidyartha.localDB.fetch
		* @methodOf Vidyartha.localDB
        * @param {String} db_name Database name 
        * @description
        * fetches all tasks from localStorage.
        * db_name param is optional 
        */
		fetch:function(db_name){
			var db_name = db_name || dbName;
			this.taskList = JSON.parse(localStorage.getItem(db_name) || '[]');
			return this.taskList;
		},
		/**
		* @ngdoc update
		* @name Vidyartha.localDB.update
		* @methodOf Vidyartha.localDB
        * @description
        * Invokes sync() method of localDB
        */
		update:function(){
			this.sync();
		},
		/**
		* @ngdoc update
		* @name Vidyartha.localDB.delete
		* @methodOf Vidyartha.localDB
		* @param {Object} task task Object
        * @description
        * Deletes given task from taskList array and updated localDB
        */
		delete:function(task){
			task_index = this.getTaskIndex(task);
			this.taskList.splice(task_index,1);
			this.sync();
		},
		/**
		* @ngdoc update
		* @name Vidyartha.localDB.clearAll
		* @methodOf Vidyartha.localDB
        * @description
        * Clears localStorage
        */
		clearAll:function(){
			localStorage.clear();
		},
		/**
		* @ngdoc update
		* @name Vidyartha.localDB.getTaskIndex
		* @methodOf Vidyartha.localDB
		* @param {Object} task task object
		* @returns {Integer} task_index Index of task in localDB
        * @description
        * returns index of task in localDB
        */
		getTaskIndex:function(task){
			// checking both timestamp and actual value
			for(var i=0; i<this.taskList.length; i++){
				if(this.taskList[i].task_id == task.task_id && this.taskList[i].task == task.task){
					return i;
				}
			}
			return -1;
		},
		/**
		* @ngdoc update
		* @name Vidyartha.localDB.getCurrentTimestamp
		* @methodOf Vidyartha.localDB
		* @returns {Timestamp} timestamp  current unix timestamp
        * @description
        * returns current timestamp
        */
		getCurrentTimestamp:function(){
			return Math.floor(Date.now() / 1000);
		}

	}

}]);