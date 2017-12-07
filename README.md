# TallyVoucherCreation
Create an expense Voucher in Tally

Tally is an Accounting Software which also has the integration capability using Api.

Tally supports XML api.

We will create an app which will push an expense voucher into Tally.

expense Object ={ type: "Expense" ,
                   amount: "300.50",
                   date: "01/12/2017",
                   description: "Travelling to Hydrabad" }]
                   
 Before that,
 
 To initiate XML interaction over HTTP with Tally, the server port has to be enabled in Tally. Click on “Configurations” or F3-> “Advanced Configurations”, and then select the following options: I set the “Tally is acting as” to “Both”, and “Port” to “9002”. Save, and exit. Restart Tally.
 
Open a browser, and enter http://localhost:9002 in the address bar. You should see a message “<RESPONSE>Tally.ERP 9 Server is Running</RESPONSE>”. Now you are good to go. Else, have a look at the documentation.

To create a voucher in tally we need to get ledger account for credit and debit, first.

We can do this by using a http post method, please refer below,

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
        
        Once We get the ledger accounts, we use another post method which creates a voucher in tally, for this example it is an expense voucher,
        
        
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
                    
                    The Success Response is:
                    
                    <ENVELOPE>
                 <HEADER>
                   <VERSION>1</VERSION>
                   <STATUS>1</STATUS>
                    </HEADER>
                      <BODY>
                     <DATA>
                     <IMPORTRESULT>
                     <CREATED>1</CREATED>
                     <ALTERED>0</ALTERED>
                 <DELETED>0</DELETED>
                   <LASTVCHID>13</LASTVCHID>
                   <LASTMID>0</LASTMID>
                  <COMBINED>0</COMBINED>
                   <IGNORED>0</IGNORED>
                    <ERRORS>0</ERRORS>
                 <CANCELLED>0</CANCELLED>
                 <VCHNUMBER>2</VCHNUMBER>
                 </IMPORTRESULT>
                      </DATA>
                     <DESC>
                  <CMPINFO>
                    <COMPANY>0
                      </COMPANY>
                     <GROUP>0</GROUP>
                   <LEDGER>31</LEDGER>
              
                   </EXPSUMDATA>
                      </DESC>
                       </BODY>
                      </ENVELOPE>
                    
                    
                    Since tally does not support cors, on the browser web security has to be disabled, or on chrome you can using the below plugin,
                    
                    https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
                    
            It is imperative that you do this, because the api will work, but we cannot get the response into the app.thankss!!
