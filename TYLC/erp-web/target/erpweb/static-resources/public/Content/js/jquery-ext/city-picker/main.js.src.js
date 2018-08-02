 $(function () {

    'use strict';

    var $citypicker1 = $('#city-picker1');

 $citypicker1.citypicker();

    $('#reset').click(function () {
        $citypicker1.citypicker('reset');
    });

    $('#set').click(function () {
		$citypicker1.citypicker('setText','����ʡ/������/������');
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
    //  province: '---- ����ʡ ----',
    //  city: '---- ������ ----',
    //  district: '---- ������ ----'
    //});
    //
    //$('#distpicker3').distpicker({
    //  province: '�㽭ʡ',
    //  city: '������',
    //  district: '������'
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