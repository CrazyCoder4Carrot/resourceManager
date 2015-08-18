$(function()
{
    var role = $('#role').val();
    var name = $('#name').val();
    var team = $('#team').val();
    var free = 'Free';
    var occupied = 'Occupied';
    var userTypes = new Array();
    var teamTypes = new Array();
    var personalFree = new Array();
    var personalOccupied = new Array();
    var teamFree = new Array();
    var teamOccupied = new Array();
    if (role == 1)
    {
        var text = $(".team").text("Whole Asset");
        var text = $(".teamFree").text("Whole Free Asset");
        var text = $(".teamOccupied").text("Whole Occupied Asset");
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
            personalFreeVal = {
                label: val.name,
                value: 0
            };
            personalOccupiedVal = {
                label: val.name,
                value: 0
            };
            teamtypeval = {
                label: val.name,
                value: 0
            };
            teamFreeval = {
                label: val.name,
                value: 0
            };
            teamOccupiedval = {
                label: val.name,
                value: 0
            };
            userTypes.push(usertypeval);
            teamTypes.push(teamtypeval);
            personalFree.push(personalFreeVal);
            personalOccupied.push(personalOccupiedVal);
            teamFree.push(teamFreeval);
            teamOccupied.push(teamOccupiedval);
        });
    });


    if (role >= 2)
    {

        $.getJSON("/api/asset/" + name + "/" + free, function(data)
        {
            var listItems;
            $.each(data, function(i, val)
            {
                for (var i = 0; i < personalFree.length; i++)
                {
                    if (personalFree[i].label == val.type)
                        personalFree[i].value++;
                }
            });
        });
        $.getJSON("/api/asset/" + name + "/" + occupied, function(data)
        {
            var listItems;
            $.each(data, function(i, val)
            {
                for (var i = 0; i < personalOccupied.length; i++)
                {
                    if (personalOccupied[i].label == val.type)
                        personalOccupied[i].value++;
                }
            });
        });
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
        $.getJSON("/api/asset/" + team + "/" + free, function(data)
        {
            var listItems;
            $.each(data, function(i, val)
            {
                for (var i = 0; i < teamFree.length; i++)
                {
                    if (teamFree[i].label == val.type)
                        teamFree[i].value++;
                }
            });
        });
        $.getJSON("/api/asset/" + team + "/" + occupied, function(data)
        {
            var listItems;
            $.each(data, function(i, val)
            {
                for (var i = 0; i < teamOccupied.length; i++)
                {
                    if (teamOccupied[i].label == val.type)
                        teamOccupied[i].value++;
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
            $.getJSON("/api/asset/" + name + "/" + free, function(data)
            {
                var listItems;
                $.each(data, function(i, val)
                {
                    for (var i = 0; i < personalFree.length; i++)
                    {
                        if (personalFree[i].label == val.type)
                            personalFree[i].value++;
                    }
                });
            });
            $.getJSON("/api/asset/" + name + "/" + occupied, function(data)
            {
                var listItems;
                $.each(data, function(i, val)
                {
                    for (var i = 0; i < personalOccupied.length; i++)
                    {
                        if (personalOccupied[i].label == val.type)
                            personalOccupied[i].value++;
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
            $.getJSON("/api/asset/bystatus/" + free, function(data)
            {
                var listItems;
                $.each(data, function(i, val)
                {
                    for (var i = 0; i < teamFree.length; i++)
                    {
                        if (teamFree[i].label == val.type)
                            teamFree[i].value++;
                    }
                });
            });
            $.getJSON("/api/asset/bystatus/" + occupied, function(data)
            {
                var listItems;
                $.each(data, function(i, val)
                {
                    for (var i = 0; i < teamOccupied.length; i++)
                    {
                        if (teamOccupied[i].label == val.type)
                            teamOccupied[i].value++;
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
        element: 'morris-personal-free-chart',
        data: personalFree,
        resize: true
    });
    Morris.Donut(
    {
        element: 'morris-personal-occupied-chart',
        data: personalOccupied,
        resize: true
    });
    Morris.Donut(
    {
        element: 'morris-team-free-chart',
        data: teamFree,
        resize: true
    });
    Morris.Donut(
    {
        element: 'morris-team-occupied-chart',
        data: teamOccupied,
        resize: true
    });
    Morris.Donut(
    {
        element: 'morris-team-chart',
        data: teamTypes,
        resize: true
    });

});
