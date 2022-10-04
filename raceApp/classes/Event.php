<?php

namespace Leaderboard;

use RuntimeException;

class Event
{
    public const PTS = [16, 13, 10, 8, 7, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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

    /**
     * record the position of a car in this race
     * @param int $carNumber - race number of this car
     * @param int $position - overall position
     */
    public function overallPosition(int $carNumber, int $position)
    {
        $this->positions['overall'][$position] = $carNumber;
    }

    /**
     * record the position within the given class
     * @param string $raceappClass - BRONZE, SILVER, GOLD, etc
     * @param int $carNumber -
     *
     * @return int number of points awarded
     */
    public function raceappClassPosition(string $raceappClass, int $carNumber, int $position): void
    {
        if ($raceappClass !== '') {
            $this->positions[$raceappClass][$position] = $carNumber;
        }

        /*
        $raceappPosition = count($this->positions[$raceappClass]) - 1;
        if ($raceappPosition >= count(self::PTS)) {
            return 0;
        }
        return self::PTS[$raceappPosition];
        */
    }

    public function sort(): void
    {
        foreach ($this->positions as $i => $e) {
            ksort($e);
            $this->positions[$i] = array_values($e);
        }
    }
}
