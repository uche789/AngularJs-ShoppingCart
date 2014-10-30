$('#myTab a').click(function (e) {
    console.log("It's here");
    e.preventDefault();
    $(this).tab('show');
})