'use strict'

angular.module('TallyApp.services',[])

.factory('TallyDataOp', ['$http', function ($http) {
    
        var TallyDataOp = {};      
    
        TallyDataOp.GetLedgers = function () {

            var GetLedgerList = "<ENVELOPE>"+
            "<HEADER>"+
            "<VERSION>1</VERSION>"+
            "<TALLYREQUEST>Export</TALLYREQUEST>"+
            "<TYPE>Data</TYPE>"+
            "<ID>List of Ledgers</ID>"+
            "</HEADER>"+
            "<BODY>"+
            "<DESC>"+
            "<TDL>"+
            "<TDLMESSAGE>"+
            "<REPORT NAME=\"List of Ledgers\" ISMODIFY=\"No\" ISFIXED=\"No\" ISINITIALIZE=\"No\" ISOPTION=\"No\" ISINTERNAL=\"No\">"+
            "<FORMS>List of Ledgers</FORMS>"+
            "</REPORT>"+
            "<FORM NAME=\"List of Ledgers\" ISMODIFY=\"No\" ISFIXED=\"No\" ISINITIALIZE=\"No\" ISOPTION=\"No\" ISINTERNAL=\"No\">"+
            "<TOPPARTS>List of Ledgers</TOPPARTS>"+
            "<XMLTAG>\"List of Ledgers\"</XMLTAG>"+
            "</FORM>"+
            "<PART NAME=\"List of Ledgers\" ISMODIFY=\"No\" ISFIXED=\"No\" ISINITIALIZE=\"No\" ISOPTION=\"No\" ISINTERNAL=\"No\">"+
            "<TOPLINES>List of Ledgers</TOPLINES>"+
            "<REPEAT>List of Ledgers : Collection of Ledgers</REPEAT>"+
            "<SCROLLED>Vertical</SCROLLED>"+
            "</PART>"+
            "<LINE NAME=\"List of Ledgers\" ISMODIFY=\"No\" ISFIXED=\"No\" ISINITIALIZE=\"No\" ISOPTION=\"No\" ISINTERNAL=\"No\">"+
            "<LEFTFIELDS>List of Ledgers</LEFTFIELDS>"+
            "</LINE>"+
            "<FIELD NAME=\"List of Ledgers\" ISMODIFY=\"No\" ISFIXED=\"No\" ISINITIALIZE=\"No\" ISOPTION=\"No\" ISINTERNAL=\"No\">"+
            "<SET>$Name</SET>"+
            "<XMLTAG>\"NAME\"</XMLTAG>"+
            "</FIELD>"+
            "<COLLECTION NAME=\"Collection of Ledgers\" ISMODIFY=\"No\" ISFIXED=\"No\" ISINITIALIZE=\"No\" ISOPTION=\"No\" ISINTERNAL=\"No\">"+
            "<TYPE>Ledger</TYPE>"+
            "</COLLECTION>"+
            "</TDLMESSAGE>"+
            "</TDL>"+
            ""+
            "</DESC>"+
            "</BODY>"+
            "</ENVELOPE>"+
            "";       
            
            return $http({ 
                    method: 'POST',
                       url: 'http://localhost:9002',
                      data: GetLedgerList,
                      
                      headers: { 
                        'Content-Type' :'multipart/form-data',
                        'Accept':'application/xml',
                        } });
        };

        TallyDataOp.CreateVoucher = function (voucherObj) {                     
                        
                        var exportxml = 
                        "<ENVELOPE>"+
                        "<HEADER>"+
                            "<VERSION>1</VERSION>"+
                                 "<TALLYREQUEST>Import</TALLYREQUEST>"+
                              "<TYPE>Data</TYPE>"+
                                 "<ID>Vouchers</ID>"+
                        "</HEADER>"+
                        "<BODY>"+
                        "<DESC>"+            
                        "</DESC>"+
                        "<DATA>"+
                        "<TALLYMESSAGE>"+
                          "<VOUCHER>"+
                            "<DATE>"+voucherObj.Vdate+"</DATE>"+
                        "<NARRATION>"+voucherObj.Narration+"</NARRATION>"+
                              "<VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>"+
                              "<EFFECTIVEDATE>"+voucherObj.Vdate+"</EFFECTIVEDATE>"+
                               "<VOUCHERNUMBER>2</VOUCHERNUMBER>"+
                        "<ALLLEDGERENTRIES.LIST>"+
                                  "<LEDGERNAME>"+voucherObj.LedgerCr+"</LEDGERNAME>"+
                                  "<ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>"+
                                   "<AMOUNT>-"+voucherObj.Amount+"</AMOUNT>"+
                        "</ALLLEDGERENTRIES.LIST>"+
                        "<ALLLEDGERENTRIES.LIST>"+
                                    "<LEDGERNAME>"+voucherObj.LedgerDr+"</LEDGERNAME>"+
                                    "<ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>"+
                                   "<AMOUNT>"+voucherObj.Amount+"</AMOUNT>"+
                        "</ALLLEDGERENTRIES.LIST>"+
                        "</VOUCHER>"+
                        "</TALLYMESSAGE>"+
                        "</DATA>"+
                        "</BODY>"+
                        "</ENVELOPE>";                  
            
                        
                        
                        return $http({ 
                                method: 'POST',
                                   url: 'http://localhost:9002',
                                  data: exportxml,
                                  
                                  headers: { 
                                    'Content-Type' :'multipart/form-data',
                                    'Accept':'application/xml',
                                   // 'Access-Control-Allow-Origin':'*'
                                    } });
                    };
        return TallyDataOp;
    
    }]);

angular.module('TallyApp.services').value('version','V1.0');

