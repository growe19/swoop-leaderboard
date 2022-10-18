
<div align="center">

  <h3 align="center">Swoop Leaderboard </h3>

  <p align="center">
    Leaderboard webapp for Assetto Corsa Competizione (ACC) using localhost supplied data from the Swoop API plug-in for SimHub.
    <br />
    <br />
    <a href="https://growe19.github.io/swoop-leaderboard/?mode=static&hide=0&order=1&class=&showme=&refresh=2500">View Demo</a>
    ·
    <a href="https://github.com/growe19/swoop-leaderboard/issues">Report Bug</a>
    ·
    <a href="https://github.com/growe19/swoop-leaderboard/issues">Request Feature</a>
  </p>
</div>
<img src="https://github.com/growe19/swoop-leaderboard/blob/main/Leaderboard.PNG"/>




<!-- ABOUT THE PROJECT -->
## About The Project

There are many great leaderboard apps for ACC; however, I didn't find one that really suited my needs so I created this. I wanted to create a leaderboard that enhanced my experience as a Driver and also provided valuable data to a League Commentator.

* RaceApp.eu intergration - Displaying historic results from previous races. Current and provisional Championship points and position updated live during the race.
* Advanced table filtering with conditions.
* URL parameters
* Intergrates with OBS using URL parameters.

<p align="right">(<a href="#top">back to top</a>)</p>

## URL Parameters Explained

<details>
  <summary><b>Mode</b></summary>
  <ul>
    <li><b><code>live</code></b> This mode requires ACC, SimHub and the SwoopAPI to be running to see data in the table.</li>
    <li><b><code>static</code></b> Sample test data mode that will not update.</li>
  </ul>
</details>
  
  <details>
  <summary><b>Hide</b></summary>
  <ul>
    <li><b><code>number</code></b> .</li>
  </ul>
</details>
  
  <details>
  <summary><b>Order</b></summary>
  <ul>
<li><b><code>number</code></b> .</li>
  </ul>
</details>
  
  <details>
  <summary><b>Class</b></summary>
  <ul>
<li><b><code>word</code></b> .</li>
  </ul>
</details>
  
  <details>
  <summary><b>Showme</b></summary>
  <ul>
<li><b><code>number</code></b> .</li>
  </ul>
</details>
  
  <details>
  <summary><b>Refresh</b></summary>
  <ul>
<li><b><code>number</code></b> .</li>
  </ul>
</details>

<p align="right">(<a href="#top">back to top</a>)</p>

## Leaderboard Columns Explained

<details>
  <summary><b>Position</b></summary>
  <ul>
    <li><b>Track</b> position is the standard position of the Driver on track. Pretty standard for Column 1 in any Leaderboard.</li>
    <li><b>Grid</b> is the position the Driver started the race in. Usually where they finished in Qualifying.</li>
    <li><b>Change</b> is the difference between the Driver's starting Grid position and their Track position. Illustrated with a red down arrow if the Driver has dropped positions, a green up arrow if they have gained positions and a straight dash line if their position has not changed. 
      <br/><img src="https://github.com/growe19/swoop-leaderboard/blob/main/change.PNG" /> 
      </li>
  </ul>
</details>

<details>
  <summary><b>Driver</b></summary>
    <ul>
    <li><b>Short Name</b> is the three letter Driver code. This <b>is</b> the first three letters of the Driver's Last Name, regardless of what they have set in-game. Because of this you can have more than one Driver with the same Short Name, which is not true to real life.</li>
    <li><b>Flag</b> for the Nationality of the Driver.</li>
    <li><b>Nationality</b> as a word for the Driver.</li>
    <li><b>Number</b> is the Driver Number.</li>
    <li><b>Full Name</b> of the Driver.</li>
    <li><b>First Name</b> of the Driver.</li>
    <li><b>Last Name</b> of the Driver.</li>
    <li><b>Cat.</b> is the Category of the Driver; PLATINUM, GOLD, SILVER, BRONZE, etc.</li>
  </ul>
</details>

<details>
  <summary><b>Team</b></summary>
  <ul>
    <li><b>Name</b> of the Team.</li>
    <li><b>Flag</b> for the Nationality of the Team.</li>
  </ul>
</details>

<details>
  <summary><b>Car</b></summary>
    <ul>
    <li><b>Logo</b>, Text</li>
    <li><b>Manufacturer</b>, Text</li>
    <li><b>Model</b>, Text</li>
    <li><b>Series</b> is the Series of the Car; GT3, GT4, etc.</li>
    <li><b>Cup</b> is the Cup of the Car; PRO, PRO-AM, SILVER, AM, etc.</li>
  </ul>
</details>

<details>
  <summary><b>Lap</b></summary>
  <ul>
    <li><b>Count</b>, is the number of Laps the Driver has completed.</li>
    <li><b>Progress</b>, along the track distance is indicated with a progress bar. The progress bar colour will turn red when the Driver is travelling through the Pit Lane or has stopped in the Pit Box. The progress bar resets from 100% back to 0% at the Start/Finish Line.
    <br/><img src="https://github.com/growe19/swoop-leaderboard/blob/main/Progress.PNG" /> 
  </ul>
</details>

<details>
  <summary><b>Gap</b></summary>
    <ul>
    <li><b>Ahead</b>, Text</li>
    <li><b>To Lead</b>, Text</li>
  </ul>
</details>

<details>
  <summary><b>Last Lap</b></summary>
  <ul>
    <li><b>Time</b>, Text</li>
    <li><b>Sector 1</b>, Text</li>
    <li><b>Sector 2</b>, Text</li>
    <li><b>Sector 3</b>, Text</li>
  </ul>
</details>

<details>
  <summary><b>Best Lap</b></summary>
 <ul>
    <li><b>Time</b>, Text</li>
    <li><b>Sector 1</b>, Text</li>
    <li><b>Sector 2</b>, Text</li>
    <li><b>Sector 3</b>, Text</li>
    <li><b>Delta From Own</b>, Text</li>
    <li><b>Delta From Global</b>, Text</li>
  </ul>
</details>

<details>
  <summary><b>Pit Stop</b></summary>
 <ul>
    <li><b>Count</b>, Text</li>
    <li><b>Laps Ago</b>, Text</li>
    <li><b>Delta</b>, Text</li>
   <li><b>ExitPos</b> is a prediction of the Track Position the Driver will be if they were to pit at any given time.</li>
  </ul>
</details>

<details>
  <summary><b>RA Class (RaceApp)</b></summary>
 <ul>
    <li><b>Class</b>, Text</li>
    <li><b>Pos</b>, Text</li>
    <li><b>Gap &amp; Traffic</b>, Text</li>
  </ul>
</details>

<details>
  <summary><b>League Standings: Current (RaceApp)</b></summary>
 <ul>
    <li><b>Pos</b>, Text</li>
    <li><b>Pts</b>, Text</li>
  </ul>
</details>

<details>
  <summary><b>League Standings: Provisional (RaceApp)</b></summary>
 <ul>
    <li><b>Change</b> is the difference between the <code>Current RaceApp League Standing Position</code> and the <code>Provisional RaceApp League Standing Position</code>. Illustrated with a red down arrow if the Driver has dropped positions, a green up arrow if they have gained positions and a straight dash line if their position has not changed.</li>
    <li><b>Pos</b> is the predicted <code>Provisional RaceApp League Standing Position</code> based on the Driver's <code>Current RaceApp League Standing Position</code> with the Points for their RaceApp Class Position Points combined.</li>
    <li><b>Pts</b>, Text</li>
  </ul>
</details>




### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Assetto Corsa Competizione on PC
* SimHub [https://www.simhubdash.com](https://www.simhubdash.com)
* Swoop Plug-in for SimHub [https://www.racedepartment.com/downloads/simhub-swoop-plugin.48487/](https://www.racedepartment.com/downloads/simhub-swoop-plugin.48487/)

### Installation

No installation required. Webapp can be accessed via GitHub Pages [https://growe19.github.io/swoop-leaderboard](https://growe19.github.io/swoop-leaderboard) or [https://garyrowe.co.uk/acc](https://garyrowe.co.uk/acc).

<p align="right">(<a href="#top">back to top</a>)</p>
