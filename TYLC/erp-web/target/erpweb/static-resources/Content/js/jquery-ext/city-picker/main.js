 $(function () {

    'use strict';

    var $citypicker1 = $('#city-picker1');

 $citypicker1.citypicker();

    $('#reset').click(function () {
        $citypicker1.citypicker('reset');
    });

    $('#set').click(function () {
		$citypicker1.citypicker('setText','江苏省/常州市/天宁区');
        // $citypicker1.citypicker('destroy');
    });
	
	$('#show').click(function () {
		var list=[];
		$citypicker1.citypicker('getValue',list);
		$.each(list,function(i,item){
			alert(item.code+item.address);
		});
        // $citypicker1.citypicker('destroy');
    });
    //
    //$('#distpicker1').distpicker();
    //
    //$('#distpicker2').distpicker({
    //  province: '---- 所在省 ----',
    //  city: '---- 所在市 ----',
    //  district: '---- 所在区 ----'
    //});
    //
    //$('#distpicker3').distpicker({
    //  province: '浙江省',
    //  city: '杭州市',
    //  district: '西湖区'
    //});
    //
    //$('#distpicker4').distpicker({
    //  placeholder: false
    //});
    //
    //$('#distpicker5').distpicker({
    //  autoSelect: false
    //});

});