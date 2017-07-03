<?php
$connect = mysqli_connect('127.0.0.1','root','password','gifi'); // First paramater stands for host, Second for Database-user, Third stand for Database-password, Forth Database-name.
 
if (!$connect) { //Connection is possible using above setting or not
 die('Could not connect to MySQL: ' . mysqli_error());
}
 
$class="";
$message='';
$error=0;
$target_dir = dirname(__FILE__)."/uploaded_csv/";
if(isset($_POST["import"]) && !empty($_FILES)) {
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
	$fileType = pathinfo($target_file,PATHINFO_EXTENSION);
	if($fileType != "csv")  // here we are checking for the file extension. We are not allowing othre then (.csv) extension .
	{
		$message .= "Sorry, only CSV file is allowed.<br>";
		$error=1;
	}
	else
	{
		if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
			$message .="File uplaoded successfully.<br>";
 
			if (($getdata = fopen($target_file, "r")) !== FALSE) {
			   fgetcsv($getdata);   
			   while (($data = fgetcsv($getdata)) !== FALSE) {
					$fieldCount = count($data);
					for ($c=0; $c < $fieldCount; $c++) {
					  $columnData[$c] = $data[$c];
					}

			 $country = mysqli_real_escape_string($connect ,$columnData[0]);
			 $investor_friendliness_rank = (int)mysqli_real_escape_string($connect ,$columnData[1]);
			 $legal_and_regulatory_environment = (int)mysqli_real_escape_string($connect ,$columnData[2]);
			 $market_development = (int)mysqli_real_escape_string($connect ,$columnData[3]);
			 $exchange_controls_and_capital_restriction = (int)mysqli_real_escape_string($connect ,$columnData[4]);
			 $corporate_governance = (int)mysqli_real_escape_string($connect ,$columnData[5]);
			 $aum_levels_and_growth = (int)mysqli_real_escape_string($connect ,$columnData[6]);
			 $banking_system = (int)mysqli_real_escape_string($connect ,$columnData[7]);
			 $ease_of_doing_business = (int)mysqli_real_escape_string($connect ,$columnData[8]);
			 $political_environment = (int)mysqli_real_escape_string($connect ,$columnData[9]);
			 $accounting_system = (int)mysqli_real_escape_string($connect ,$columnData[10]);
			 $year_of_data = (int)mysqli_real_escape_string($connect ,$columnData[11]);
			 $region = mysqli_real_escape_string($connect ,$columnData[12]);

			 $import_data[]=" ( '".$country."',".$investor_friendliness_rank.",".$legal_and_regulatory_environment.",".$market_development.",".$exchange_controls_and_capital_restriction.",".$corporate_governance.",".$aum_levels_and_growth.",".$banking_system.",".$ease_of_doing_business.",".$political_environment.",".$accounting_system.",".$year_of_data.",'".$region."' ) ";
			// SQL Query to insert data into DataBase
			 }

			 $import_data = implode(",", $import_data);
			 //insert csv data
			 $query = "REPLACE INTO ranks(country, investor_friendliness_rank,legal_and_regulatory_environment,market_development,exchange_controls_and_capital_restriction,corporate_governance,aum_levels_and_growth,banking_system,ease_of_doing_business,political_environment,accounting_system,year_of_data,region) VALUES  $import_data ;";
			 $result = mysqli_query($connect ,$query);
			 $message .="Data imported successfully.";
			 fclose($getdata);

			 //insert csv file info
			 $fileName = basename($_FILES["fileToUpload"]["name"]);

			 $query_rankingcsv = "REPLACE INTO rankingCSV(csvname, year) VALUES('$fileName', '$year_of_data');";
			 $result = mysqli_query($connect ,$query_rankingcsv);
			}
 
		} else {
			$message .="Sorry, there was an error uploading your file.";
			$error=1;
		}
	}
}
$class="warning";
if($error!=1)
{
	$class="success";
}
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="../../css/bootstrap.min.css"> 
</head>
<body>
 
<div class="container" style="margin-top:20px; margin-bottom:20px;padding:10px;">
<?php
	if(!empty($message))
	{
?>
<div class="btn-<?php echo $class;?>" style="width:30%;padding:10px;margin-bottom:20px;">
<?php
		echo $message;
 
 ?>
</div>
<?php } ?>
 
<form role="form" action="<?php echo $_SERVER['REQUEST_URI'];?>" method="post" enctype="multipart/form-data">
<fieldset class="form-group">
	<div class="form-group">
	<input type="file" name="fileToUpload" id="fileToUpload">
	<label for="image upload" class="control-label">Only .csv file is allowed. </label>
	</div>
	<div class="form-group">
    <input type="submit" class="btn btn-warning" value="Import Data" name="import">
	</div>
	</fieldset>
</form>
</div>
</body>
</html>