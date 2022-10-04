<?php

namespace Leaderboard;

use RuntimeException;

class Car
{
    /**
     * @var int $Id
     */
    public int $number;
    public string $name;
    public string $class;
    public string $model;
    public string $raceappClass;

    public int $raceappPts;

    public function __construct(array $car)
    {
        $n = strpos($car['CarName'], ' ');
        if (!$n) {
            $this->number = (int)substr($car['CarName'], 1);
            $this->name = '';
        } else {
            $this->number = (int)substr($car['CarName'], 1, $n);
            // $this->name = substr($car['CarName'], strlen($this->number));
            $this->name = $car['CarName'];
        }

        $this->class = $car['VehicleClass'];
        $this->model = $car['VehicleModel'];
        $this->raceappClass = $car['Tag'] ?? '';

        $this->raceappPts = 0;
    }

    /**
     * assign given number of points to this car's total
     */
    public function assignPts(int $pts): void
    {
        if ($this->raceappClass !== '') {
            $this->raceappPts += $pts;
        }
    }
}
