<?php

namespace Leaderboard;

use RuntimeException;

class Event
{
    private const PTS = [16, 13, 10, 8, 7, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    /**
     * @var int $Id
     */
    public int $Id;
    public string $name;
    public int $eventIndex;
    public int $seriesId; // link to the series
    public string $start;
    public string $track;
    public array $positions; // order the cars finished

    public function __construct(array $event)
    {
        $this->Id = $event['Id'];
        $this->name = $event['Name'];
        $this->eventIndex = $event['EventNumber'];
        $this->seriesId = $event['SeriesId'];
        $this->start = $event['Start']; // ISO date time string
        $this->track = $event['Track'];

        $this->positions = [];
    }

    public function overallPosition (int $carId, int $position)
    {
        $this->positions['overall'][$position] = $carId;
    }

    public function raceappClassPosition (string $raceappClass, int $carId): int
    {
        $this->positions[$raceappClass][] = $carId;

        $raceappPosition = count($this->positions[$raceappClass]) - 1;
        if ($raceappPosition >= count(self::PTS)) {
            return 0;
        }
        return self::PTS[$raceappPosition];
    }
}
