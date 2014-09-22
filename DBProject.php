<?php
// these four variables are used in handling of the db
	$dbhost = "localhost";
	$dbuser = "cwgervai";
	$dbpassword = "cwgervai";
	$dbdatabase = "cwgervai";

	$conn = mysql_connect($dbhost,$dbuser,$dbpassword) or die("The database did not connect successfully" .  mysql_error());

	mysql_select_db($dbdatabase,$conn)  or die("Unable to connect to the database" . mysql_error());

if(isset($_GET['action']) && !empty($_GET['action'])) {
    $action = $_GET['action'];
    switch($action) {
        case 'autocomplete' : autocomplete();break;
        case 'winners' : winners();break;
		case 'goalies' : goalies();break;
        // ...etc...
    }
}

function insert()
{
	$name = $_REQUEST['Name'];
	$team = $_REQUEST['Team'];
	$height = $_REQUEST['Height'];
	$weight = $_REQUEST['Weight'];
	$salary = $_REQUEST['Salary'];
	
	$sqlInsert = "INSERT INTO Player VALUES ('', '$name', '$height', '$weight', '$salary', '$team', '')";
    return "Hello";
}

function autocomplete()
{
	global $conn;
	$sqlPlayers = "Select P.Name From Player P";
	$query = mysql_query($sqlPlayers, $conn) or die("The query was not executed successfully" .  mysql_error());
	$all_results = array();
	while ($result = mysql_fetch_array($query)){
		$all_results[] = array_values($result);
	}
	echo json_encode($all_results);
}

function winners()
{
	global $conn;
	
	$sql = "Select P.PlayerID, P.Name, T.Name
	From Player P, Team T
	Where P.TeamID = T.NameID
	And Exists( Select T2.Name
	From Team T2, Game G
	Where G.GameDate = (Select Max(G2.GameDate) From Game G2)
	And T.Name = T2.Name
	And ((T2.Name = G.HomeTeam And G.HomeScore > G.AwayScore)
	Or (T2.Name = G.AwayTeam And G.AwayScore > G.HomeScore)))
	";

	$query = mysql_query($sql, $conn) or die("The query was not executed successfully" .  mysql_error());

	$all_results = array();
	while ($result = mysql_fetch_array($query)){
		$all_results[] = array_values($result);
	}
	echo json_encode($all_results);
}

function goalies()
{
	global $conn;

	$sql = "SELECT P.Name, T.Name, MAX(G.SP ), P.Salary 
	FROM Player P, Goalies G, Team T
	WHERE P.PlayerID = G.PlayerID AND P.TeamID = T.NameID
	GROUP BY P.TeamID
	ORDER BY MAX(G.SP) DESC
	";

	$query = mysql_query($sql, $conn) or die("The query was not executed successfully" .  mysql_error());

	$all_results = array();
	while ($result = mysql_fetch_array($query)){
		$all_results[] = array_values($result);
	}
	echo json_encode($all_results);
}
?>
