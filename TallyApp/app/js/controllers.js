'use strict'

angular.module('TallyApp.controllers',[])
.controller('TallyController', function ($scope,$filter, TallyDataOp) {

    $scope.expense=[];
    $scope.LedgerCr = "";
    $scope.LedgerDr = "";
    $scope.expense=  [{ type: "Expense" ,
                   amount: "300.50",
                   date: "01/12/2017",
                   description: "Travelling to Hydrabad" }];

                   var datestring = $scope.expense[0].date;
                   var date = datestring.substr(6, 4) + datestring.substr(3, 2) + datestring.substr(0, 2);                 
                   $scope.VoucherDate = date;
                   console.log(date);
                   TallyDataOp.GetLedgers()
                   .success(function (respo) {
                       console.log(respo);
                       var res = respo.replace(/<LISTOFLEDGERS>|\<\/LISTOFLEDGERS>|<NAME>|\s+/g, "");
                       var res1 = res.replace(/<\/NAME>/g, ",");
                       var res2 = res1.replace(/&amp;/g, " & ");
                       var res3 = res2.split(",");
                       $scope.ledgerList = res3;                     

                   }).
                   error(function (error) {
                       alert("fail");
                   });
                 
    $scope.addTally = function () {    
        
        var voucherObj = {};
        voucherObj.Vdate = $scope.VoucherDate;
        voucherObj.LedgerCr = $scope.LedgerCr;
        voucherObj.LedgerDr = $scope.LedgerDr;
        voucherObj.Amount = $scope.expense[0].amount;
        voucherObj.Narration = $scope.expense[0].description;        
       
        TallyDataOp.CreateVoucher(voucherObj)
            .success(function (respo) {
                console.log(respo);                
                
              alert("Voucher Created Successfully!!");
            }).
            error(function (error) {
                alert("fail");
            });
    };
});