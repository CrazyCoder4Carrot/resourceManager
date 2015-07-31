$(function()
{
    var role = $('#role').val();
    var name = $('#name').val();
    var team = $('#team').val();
    var userTypes = new Array();
    var teamTypes = new Array();
    if(role == 1)
    {
        var text = $("#teamname").text("Whole Asset");
    }
    $.ajaxSettings.async = false;
    $.getJSON("/api/types/", function(data)
    {
        var listItems;
        $.each(data, function(i, val)
        {
            usertypeval = {
                label: val.name,
                value: 0
            };
            teamtypeval = {
                label: val.name,
                value: 0
            };
            userTypes.push(usertypeval);
            teamTypes.push(teamtypeval);
        });
    });


    if (role >= 2)
    {

        $.getJSON("/api/asset/byuser/" + name, function(data)
        {
            var listItems;
            $.each(data, function(i, val)
            {
                for (var i = 0; i < userTypes.length; i++)
                {
                    if (userTypes[i].label == val.type)
                        userTypes[i].value++;
                }
            });
        });
        $.getJSON("/api/asset/byteam/" + team, function(data)
        {
            var listItems;
            $.each(data, function(i, val)
            {
                for (var i = 0; i < teamTypes.length; i++)
                {
                    if (teamTypes[i].label == val.type)
                        teamTypes[i].value++;
                }
            });
        });
    }
    else
    {
        if (role == 1)
        {
            $.getJSON("/api/asset/byuser/" + name, function(data)
            {
                var listItems;
                console.log(data);
                $.each(data, function(i, val)
                {
                    for (var i = 0; i < userTypes.length; i++)
                    {
                        if (userTypes[i].label == val.type)
                            userTypes[i].value++;
                    }
                });
            });
            $.getJSON("/api/asset/", function(data)
            {
                var listItems;
                $.each(data, function(i, val)
                {
                    for (var i = 0; i < teamTypes.length; i++)
                    {
                        if (teamTypes[i].label == val.type)
                            teamTypes[i].value++;
                    }
                });
            });
        }
    }
    $.ajaxSettings.async = true;
    Morris.Donut(
    {
        element: 'morris-personal-chart',
        data: userTypes,
        resize: true
    });
    Morris.Donut(
    {
        element: 'morris-team-chart',
        data: teamTypes,
        resize: true
    });

});
