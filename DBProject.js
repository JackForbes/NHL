if (Meteor.isClient) {
      $(document).ready(function() {
	  	var names = new Array();
		$.get("/~cwgervai/DBProject.php",{action: 'autocomplete'}, function(result) {
			var parsed = JSON.parse(result);
			$.each(parsed, function(i, val) {
				names.push(val[0]);
			});
		});

        $("#generalTabs").tabs({ show: { effect: "clip", duration: 800 }, hide: { effect: "clip", duration:800 } });
        $("#insertTabs").tabs({ show: { effect: "slide", duration: 800 }, hide: { effect: "slide", duration:800 } });
        $(".autocomplete").autocomplete({source:names});

        //Query Submits
        $("#topQuery").click(function() {
            if($(this).val() == "Run Query") {
                $(this).val('Hide Result');
                $("#topDiv").text("Sydney Crosby");
                $("#topDiv").show('slow');
            } else {
                $("#topDiv").hide('slow');
                $(this).val('Run Query');
            }
        });
        $("#costQuery").click(function() {
            if($(this).val() == "Run Query") {
                $(this).val('Hide Result');
                $("#costDiv ol").append("<li>Sydney Crosby</li>");
                $("#costDiv").show('slow');
            } else {
                $("#costDiv").hide('slow');
                $(this).val('Run Query');
            }
        });
        $("#winQuery").click(function() {
            if($(this).val() == "Run Query")  {
				if ($("#winDiv ul").is(":empty")){
					$.get("/~cwgervai/DBProject.php",{action: 'winners'}, function(result) {
						var parsed = JSON.parse(result);
						var winningTeam = parsed[0][3];
						$("#winDiv ul").before("<p style='font-weight:bold'>Winning Team: " + winningTeam + "</p>");
						$.each(parsed, function(i, val) {
							$("#winDiv ul").append("<li>" + val[2] + "</li>");
						});
					});
				}
                $(this).val('Hide Result');
                $("#winDiv").show('slow');
            } else {
                $("#winDiv").hide('slow');
                $(this).val('Run Query');
            }
        });
        $("#saveQuery").click(function() {
            if($(this).val() == "Run Query") {
				if ($("#saveDiv tbody").is(":empty")){
					$.get("/~cwgervai/DBProject.php",{action: 'goalies'}, function(result) {
						var parsed = JSON.parse(result);
						$.each(parsed, function(i, val) {
							$("#saveDiv tbody").append("<tr><td>"+val[0]+"</td><td>"+val[1]+"</td><td>"+val[3]+"</td><td>"+val[5]+"</td></tr>");
						});
					});
				}
                $(this).val('Hide Result');
                $("#saveDiv").show('slow');
            } else {
                $("#saveDiv").hide('slow');
                $(this).val('Run Query');
            }
        });
		var fields = ["name", "height", "weight", "salary", "team", "shooting",
                "position", "goals", "assists", "otGoals"];
        //Insert JS
        $("#insertSkater").click(function() {
			var object = {Name:$("#name").val(), Height:$("#height").val(),
				Weight:$("#weight").val(), Salary:$("#salary").val(), Team:$("#team").val()};

            $.ajax({
                type: "POST",
                url: "/~cwgervai/DBProject.php",
                // data: {action: 'test'},
				success: function(result) {
					//Another ajax call to add skater
					alert(result);
				},
				error: function(result) {
					alert(result);
				}
            });
            return false;
        });
        $("#insertGoalie").click(function() {

            $.ajax({
                type: "GET",
                url: "/~cwgervai/DBProject.php",
                data: {action: 'blah'},
				// dataType: 'json',
				success: function(result) {
					//Another ajax call to add skater
					var parsed = JSON.parse(result);
					$.each(parsed, function(i, val) {
						names.push(val[0]);
						// $.each(val, function(j, name) {
							// names.push(name);
						// });
					});
				},
				error: function(result) {

				}
            });
            return false;
        });

        //Delete JS
        $("#deletePlayer").click(function() {
            var whoToDelete = $("#whoToDelete").val();
            var deleteResult = $("#deleteResult");
            if (whoToDelete == null) {
                return;
            } else {
                deleteResult.css("color","red").text("Unable to delete player");
                //$.ajax({
                    //type: "POST",
                    //url: "DBProject.php",
                    //data: {name:whoToDelete},
                    //sucess: function() {
                        //deleteResult.css("color","green").text("Successfully deleted player!");
                    //},
                    //error: function() {
                        //deleteResult.css("color","red").text("Unable to delete player");
                    //}
                //});
            }
            return false;
        });

        //Modify JS
        $("#showAttributes").click(function() {
            var whoToModify = $("#whoToModify").val();
            if( whoToModify == "Sydney Crosby") {
                $("#modifyGoalie").hide();
                $("#modifySkater").show('slow');
            } else if(whoToModify == "Random Player") {
                $("#modifySkater").hide();
                $("#modifyGoalie").show('slow');
            }
        });
        $("#modifySkaterSubmit").click(function() {
        });

        //Get player positions
        //$.get('/DBProject.php', function(data) {
            //alert(data);
            //$.each(data, function(value, text) {
                //$("#positions").append("<option value='" + value + "'>" + text + "</option>");
            //});
        //});

      });
}
