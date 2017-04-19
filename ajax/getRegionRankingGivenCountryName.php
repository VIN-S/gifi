<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['country']) and isset($_GET['year'])){
	$year = $_GET['year'];
	$selectedCountry = (string)$_GET['country'];
	$query="SELECT 
			AVG(investor_friendliness_rank) as investor_friendliness_rank, 
			AVG(legal_and_regulatory_environment) as legal_and_regulatory_environment, 
			AVG(market_development) as market_development, 
			AVG(exchange_controls_and_capital_restriction) as exchange_controls_and_capital_restriction, 
			AVG(corporate_governance) as corporate_governance, 
			AVG(aum_levels_and_growth) as aum_levels_and_growth, 
			AVG(banking_system) as banking_system, 
			AVG(ease_of_doing_business) as ease_of_doing_business, 
			AVG(political_environment) as political_environment, 
			AVG(accounting_system) as accounting_system 
			FROM ranks 
			WHERE year_of_data = '$year' AND region = 
			(SELECT region FROM ranks WHERE country = '$selectedCountry' AND year_of_data = '$year')";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}
}
?>