<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$fileName = $_GET['fileName'];
	$title = $_GET['title'];
	$year = $_GET['year'];
	$journalName = $_GET['journalName'];
	$issueNumber = $_GET['issueNumber'];
	$volumeNumber = $_GET['volumeNumber'];
	$authorNames = $_GET['authorNames'];

	$query="
	REPLACE INTO researchPapers(title, fileName, yearOfDocument, journalName, issueNumber, volumeNumber, authorNames) VALUES('$title', '$fileName', '$year', '$journalName', '$issueNumber', '$volumeNumber', '$authorNames');
	";
	$result = mysqli_query($connect, $query);
?>