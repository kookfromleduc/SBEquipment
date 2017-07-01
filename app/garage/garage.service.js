(function() {
    'use strict';

    angular
        .module('app.garage')
        .factory('equipmentService', equipmentService)

    equipmentService.$inject = ['$firebaseArray', '$firebaseObject', 'DataService'];

    function equipmentService($firebaseArray, $firebaseObject, DataService) {

          var root = firebase.database();

          var service = {
              equipmentList: equipmentList,
              addEquipment: addEquipment,
              updateEquipment: updateEquipment,
              removeEquipment: removeEquipment,
              equipment: equipment,
              coaches: coaches,
              addCoach: addCoach,
              removeCoach: removeCoach,
              coach: coach
          };

          return service;

          function equipmentList() {
              return $firebaseArray(root.ref('equipment/'));
          }

          function addEquipment(obj) {
              obj.date_added = firebase.database.ServerValue.TIMESTAMP;
              obj.location = 'Office';
              return $firebaseArray(root.ref('equipment/')).$add(obj).then(function(ref){
                  return ref.key;
              });
          }

          function updateEquipment(obj) {
              obj.date_modified = firebase.database.ServerValue.TIMESTAMP;
              return DataService.root.ref('equipment/'+ obj.$id).update({location: obj.location, date_modified: obj.date_modified});
          }

          function removeEquipment(id) {
              return root.ref('equipment/'+ id).remove();
          }

          function equipment(id) {
              return $firebaseObject(root.ref('equipment/'+ id));
          }

          function coaches() {
              return $firebaseArray(root.ref('coaches/'));
          }

          function addCoach(obj) {
              obj.date_added = firebase.database.ServerValue.TIMESTAMP;
              return $firebaseArray(root.ref('coaches/')).$add(obj).then(function(ref){
                  return ref.key;
              });
          }

          function removeCoach(id) {
              return root.ref('coaches/'+ id).remove();
          }

          function coach(id) {
              return $firebaseObject(root.ref('coaches/'+ id));
          }
    }

})();
