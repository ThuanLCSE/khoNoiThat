angular.module('furniture').controller('FurnitureController',
 ['$scope', 'FurnitureService','UserService','$location',
 function($scope, FurnitureService,UserService,$location) {
    $( "#lastComeInDay" ).datepicker();
    $( "#lastOrderDay" ).datepicker();
     $( "#lastComeInAddDay" ).datepicker();
    $( "#lastOrderAddDay" ).datepicker();
    $( "#fromDay" ).datepicker();
    $( "#toDay" ).datepicker();
    $scope.flag={
        searchMonth : 0,
        currentWarehouse: '',
        checkCode: false,
        quantity: 0,
        tableUr: ''};
    $scope.furnitureData = {};
    $scope.formUrl = '';
    $scope.resultInformation = '';
    var showResultModal = function(inform){
         $scope.resultInformation = inform;
         $('#resultModal').modal('show');
    }
    $scope.checkSession = function() {
        UserService.checkAuthenticated({
                action: 'checkAuthenticated'
            }, function(response) {
                $scope.userFullName = response.username;
            }, function(errorResponse) {
                $location.path('/signin');
            });
        }
    $scope.showTable =function(warehouseType) {
        $scope.flag.currentWarehouse = warehouseType;

        if ($scope.flag.currentWarehouse === 'warehouse') {
            $scope.flag.tableUrl= 'views/warehouse.htm';
        } else if ($scope.flag.currentWarehouse === 'preOrder'){
            $scope.flag.tableUrl= 'views/preOrder.htm';
        }
        getAllByType();
    }
    var addToWarehouse = function(importFurniture) {
        var newFurniture = importFurniture?importFurniture:$scope.furnitureData;
        FurnitureService.addWarehouseFurniture({
            action: 'add',
            warehouseType: 'warehouse'
        }, {
        	furniture: newFurniture
        }, function(response) {
            showResultModal('Thêm hàng vào kho thành công');
            getAllByType();
        }, function(errResponse) {
            showResultModal('add fail');
        });
    };
    var addToPreOrder = function() {
        var newFurniture = $scope.furnitureData;
        FurnitureService.addPreOrderFurniture({
            action: 'add',
            warehouseType: 'preOrder'
        }, {
            furniture:  newFurniture
        }, function(response) {
            showResultModal('Đã thêm hàng đặt');
            getAllByType();
        }, function(errResponse) {
            showResultModal('add fail');
        });
    };
    $scope.callAddForm = function(warehouseType){
        $scope.flag.currentWarehouse = warehouseType;
    }
    $scope.checkCodeBeforAdd = function(){
        $scope.flag.checkCode = true;
        checkCode($scope.furnitureData.code);
    }
    var getAllByType = function(){
    	FurnitureService.getAllFurniture({
    		action: 'getAll',
    		warehouseType: $scope.flag.currentWarehouse
    	},null,function(response){
    		$scope.furnitureList = response;
    	},function(errResponse){
    		showResultModal('Thất bại');
    	});
    };
    $scope.searchWarehouseByText = function(){
         $scope.flag.currentWarehouse = 'warehouse';
         $scope.flag.tableUrl= 'views/warehouse.htm';
        FurnitureService.searchWarehouseByText({
            action: 'getAll',
            warehouseType: 'warehouse'
        },{
            searchText: $scope.searchInput
        },function(response){
            $scope.furnitureList = response;
        },function(errResponse){
            showResultModal('fail');
        })
    };
    $scope.searchPreOrderByText = function(){
         $scope.flag.currentWarehouse = 'preOrder';
          $scope.flag.tableUrl= 'views/preOrder.htm';
        FurnitureService.searchPreOrderByText({
            action: 'getAll',
            warehouseType: 'preOrder'
        },{
            searchText: $scope.searchInput
        },function(response){
            $scope.furnitureList = response;
        },function(errResponse){
            showResultModal('Thất bại');
        })
    };


    $scope.callEditByIndexForm = function(index,warehouseType){
        $scope.furnitureData = $scope.furnitureList[index];
        $scope.formUrl = 'views/editForm.htm';
        $scope.flag.currentWarehouse = warehouseType;
    }
    $scope.editFurniture = function(){
        editByType();
    }
    var editByType = function(){
        var editedFurniture = $scope.furnitureData;
        FurnitureService.editWarehouseByCode({
            action: 'edit',
            warehouseType: $scope.flag.currentWarehouse
        }, {
            furniture: editedFurniture
        }
        ,function(response){
            showResultModal('Thao tác thành công');
            getAllByType();
        },function(errResponse){
            showResultModal('Thất bại');
        });
      //  $scope.flag.checkCode = false;
    };
    $scope.removeFurniture = function(){
       if ($scope.flag.currentWarehouse === 'warehouse') {
            removeFromWarehouse();
        } else if ($scope.flag.currentWarehouse === 'preOrder'){
            removeFromPreOrder();
        }
    };
    var removeFromPreOrder = function(){
        var removingFurniture = $scope.furnitureData;
        
        FurnitureService.removePreOrderByCode({
            action: 'remove',
            warehouseType: 'preOrder',
            furnitureCode: removingFurniture.code
        },null
        ,function(response){
            showResultModal('remove done');
            getAllByType();
        },function(errResponse){
            showResultModal('fail');
        });
    };
    var removeFromWarehouse = function(){
        var removingFurniture = $scope.furnitureData;
        
        FurnitureService.removeWarehouseByCode({
            action: 'remove',
            warehouseType: 'warehouse',
            furnitureCode: removingFurniture.code
        }, null
        ,function(response){
            showResultModal('remove done');
            getAllByType();
        },function(errResponse){
            showResultModal('fail');
        });
    }
    $scope.setFurnitureData = function(index,warehouseType){
        $scope.furnitureData = $scope.furnitureList[index];
        $scope.flag.currentWarehouse = warehouseType;
    }
    $scope.sellWarehouse = function(){
        var quantitySell = $scope.flag.quantity;
        $scope.furnitureData.quantity -= quantitySell;
        if ($scope.furniture.quantity === 0){
            removeFromWarehouse();
        } else {
            editByType();
        }
    }
    var adjustQuantity = function(){
        $scope.furnitureData.quantity = $scope.furnitureData.quantity +1 -1 + response.quantity;
        if ($scope.flag.currentWarehouse === 'warehouse'){
            $scope.furnitureData.lastComeInDay = Date.now();
        } else {
            $scope.furnitureData.lastOrderDay = Date.now();
        }
        $('#checkCodeModal').modal('show');
    }
    var checkCode = function(code){
        var furnitureCode = code;
        FurnitureService.searchWarehouseByCode({
            action: 'searchByCode',
            warehouseType: $scope.flag.currentWarehouse
        },{
            searchCode: furnitureCode
        },function(response){
            adjustQuantity();
        },function(errResponse){
            addToWarehouse();
        });
    }

    $scope.importPreOrder = function(){
        var quantityImp = $scope.flag.quantity;
        $scope.furnitureData.quantity -= quantityImp;
        if ($scope.furniture.quantity === 0){
            removeFromPreOrder();
        } else {
            editByType();
        }
        var importFurniture = {
            name :  $scope.furnitureData.name,
            type :  $scope.furnitureData.type,
            code :  $scope.furnitureData.code,
            quantity : quantityImp,
            price :  $scope.furnitureData.price,
            imageUrl :  $scope.furnitureData.imageUrl,
        };
        addToWarehouse(importFurniture);
    }
}]);