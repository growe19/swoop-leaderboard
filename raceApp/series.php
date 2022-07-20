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

$seriesId = $_GET['seriesId'];

$url = "https://raceapp.eu/api/series/";

try {
    $client = new Client([
        // Base URI is used with relative requests
        'base_uri' => $url,
        // You can set any number of default request options.
        'timeout'  => 20.0,
    ]);

    $response = $client->request('GET', $seriesId);

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
    http_response_code(403);
    // echo Psr7\Message::toString($e->getRequest());
    echo Psr7\Message::toString($e->getResponse());
}
