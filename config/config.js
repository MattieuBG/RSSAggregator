

angular.module('app.config', [])

/* Les constantes!
		Lorsque l'on souhaite avoir une constante dans un controlleur,
		il faut le déclarer dans les arguments qu'il reçoit
	*/
    .constant('API_URL', 'https://gentle-forest-84146.herokuapp.com/')
    .constant('IMG_URL', 'https://img-secure.tootsweet-app.com/')
	.constant('DATE_EXCHANGE_FORMAT', 'DD-MM-YYYY');

