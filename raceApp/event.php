<?php
namespace leaderboard;

/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
require dirname(__FILE__, 2) . '/vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7;

// echo '<h1>Starting ... </h1>';
$eventId = $_GET['eventId'];

$url = "https://raceapp.eu/api/event/" . $eventId . "/";

$client = new Client([
    // Base URI is used with relative requests
    'base_uri' => $url,
    // You can set any number of default request options.
    'timeout'  => 20.0,
]);

try {
    $response = $client->request('GET', 'results');

    $code = $response->getStatusCode(); // 200

    if ($code === 200) {
        // Check if a header exists.
        if ($response->hasHeader('Content-Length')) {
            // echo "Header exists<br/>";
        }

        $body = $response->getBody();

        echo $body->getContents();
    } else {
        http_response_code(403);
        echo 'Failed';
    }
} catch (ClientException $e) {
    echo Psr7\Message::toString($e->getRequest());
    echo Psr7\Message::toString($e->getResponse());
}
