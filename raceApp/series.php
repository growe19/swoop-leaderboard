<?php
namespace Leaderboard;
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
require dirname(__FILE__, 2) . '/vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7;

use Leaderboard\Event;

if (!isset($_GET['seriesId'])) {
    echo 'Please send a seriesId';
    exit(0);
}

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
        $series = $body->getContents();

        $s = json_decode($series, true, 512, JSON_NUMERIC_CHECK | JSON_THROW_ON_ERROR);

        $events = [];
        foreach ($s['Events'] as $event) {
            $e = new Event($event);
            $events[$e->Id] = $e;
        }

        $cars = [];
        foreach ($s['Results'] as $car) {
            $c = new Car($car);
            $cars[] = $c;

            // build finishing positions based on Event properties of each car
            foreach ($car['Events'] as $result) {
                if ($result['Position']) {
                    $events[$result['ManagedEventId']]->overallPosition($c->number, $result['Position']);
                    $events[$result['ManagedEventId']]->raceappClassPosition($c->raceappClass, $c->number, $result['Position']);

                    // $c->assignPts($pts);
                }
            }
        }

        // now we got all the cars in order we can assign points
        foreach ($events as $event) {
            $event->sort();

            // loop thru the raceappClass positions assigning points
            foreach ($event->positions as $i => $p) {
                foreach ($p as $pos => $carNumber) {
                    $carIndex = array_search($carNumber, array_column($cars, 'number'));
                    // $cars[$carIndex]->assignPts(Event::PTS[$pos]);
                }
            }
        }


        header('Content-Type: application/json;charset=utf-8');
        cors();

        echo json_encode(['events' => $events, 'cars' => $cars]);
    } else {
        http_response_code(403);
        echo 'Failed to fetch data from RaceApp, status code: ' . $code;
    }
} catch (ClientException $e) {
    http_response_code(403);
    echo Psr7\Message::toString($e->getResponse());
}

/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 */
function cors()
{
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    // echo "You have CORS!";
}
