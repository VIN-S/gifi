<?php
$connect = mysqli_connect('127.0.0.1','root','password','gifi'); // First paramater stands for host, Second for Database-user, Third stand for Database-password, Forth Database-name.
if (!$connect) { //Connection is possible using above setting or not
 die('Could not connect to MySQL: ' . mysqli_error());
}
 
$filepath = "/Users/VIN-S/Downloads/importdata/sample.csv"; 
 
if (($getdata = fopen($filepath, "r")) !== FALSE) {
               fgetcsv($getdata);   
               while (($data = fgetcsv($getdata)) !== FALSE) {
                    $fieldCount = count($data);
                    for ($c=0; $c < $fieldCount; $c++) {
                      $columnData[$c] = $data[$c];
                    }
             $option_name = mysqli_real_escape_string($connect ,$columnData[0]);
             $option_value = mysqli_real_escape_string($connect ,$columnData[1]);
             $import_data[]="('".$option_name."','".$option_value."')";
            // SQL Query to insert data into DataBase
 
             }
             $import_data = implode(",", $import_data);
             $query = "INSERT INTO option_data_master(option_name,option_value) VALUES  $import_data ;";
             $result = mysqli_query($connect ,$query);
 
             fclose($getdata);
}
echo "Data imported successfully.";
?>