let mk8s = {
    DNS_PATH:'/mk8s/dns/',
    echo:function(value){
        alert(value)
    },
    init: function(){
        $('#dnsEnableButton').click(function () {
            mk8s.dns('enable');
        });
        $('#dnsDisableButton').click(function () {
            mk8s.dns('disable');
        });
    },
    resetConsoleOutput: function(){
        //clear output
        $('#console-output').val('');
    },
    /**
     * Call mk8s dns command
     * @param operation - supported values: enable|disable|status
     */
    dns: function(operation){
        this.resetConsoleOutput();
        var outElem = $('#console-output');
        outElem.hide();
        $('#loading').show();
        var url = this.DNS_PATH+operation;
        this.handleAction(url,'GET',function(error,res){
            var out = error;
            if(res!==null && res.responseJSON !== null) {
                if (error == null) {
                    out = res.data;
                } else {
                    out = res.responseJSON.error;
                }
            }
            outElem.val(out);
            $('#loading').hide();
            outElem.show();
        });
    },
    handleAction: function(actionUrl, httpMethod, cb){
        $.ajax({
            url: actionUrl+( (typeof operation == "undefined" || operation==null)?"":("/"+operation)),
            type: httpMethod,
            success: function (data, textStatus, jqXHR) {
                console.log(actionUrl+" was successful");
                if(cb){
                    cb(null, data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if(cb){
                    cb(errorThrown, jqXHR);
                }
                console.log(actionUrl+" error:"+errorThrown);
            }
        });
    }
};