export default function colVis( dt, idx, title ) {
  if(idx==0){ return '<small>'+(idx)+': Additional Data +</small>';}
  if(idx==1){ return '<small>'+(idx)+': Track Position</small>';}
  if(idx==2){ return '<small>'+(idx)+': Starting Grid Position</small>';}
  if(idx==3){ return '<small>'+(idx)+': Grid to Track Pos Change</small>';}
  if(idx==4){ return '<small>'+(idx)+': Driver: Short Name</small>';}
  if(idx==5){ return '<small>'+(idx)+': Driver: Nationality Flag</small>';}
  if(idx==6){ return '<small>'+(idx)+': Driver: Nationality Word</small>';}
  if(idx==7){ return '<small>'+(idx)+': Driver: Race Number</small>';}
  if(idx==8){ return '<small>'+(idx)+': Driver: Full Name</small>';}
  if(idx==9){ return '<small>'+(idx)+': Driver: First Name</small>';}
  if(idx==10){ return '<small>'+(idx)+': Driver: Last Name</small>';}
  if(idx==11){ return '<small>'+(idx)+': Driver: Category</small>';}
  if(idx==12){ return '<small>'+(idx)+': Team: Name</small>';}
  if(idx==13){ return '<small>'+(idx)+': Team: Nationality Flag</small>';}
  if(idx==14){ return '<small>'+(idx)+': Car: Logo</small>';}
  if(idx==15){ return '<small>'+(idx)+': Car: Manufacturer</small>';}
  if(idx==16){ return '<small>'+(idx)+': Car: Model</small>';}
  if(idx==17){ return '<small>'+(idx)+': Car: Series</small>';}
  if(idx==18){ return '<small>'+(idx)+': Car: Cup </small>';}
  if(idx==19){ return '<small>'+(idx)+': Lap: Total Count</small>';}
  if(idx==20){ return '<small>'+(idx)+': Lap: Track Progress Bar</small>';}
  if(idx==21){ return '<small>'+(idx)+': Gap: To Driver Ahead</small>';}
  if(idx==22){ return '<small>'+(idx)+': Gap: To Leader</small>';}
  if(idx==23){ return '<small>'+(idx)+': Last Lap: Time</small>';}
  if(idx==24){ return '<small>'+(idx)+': Last Lap: Sector 1</small>';}
  if(idx==25){ return '<small>'+(idx)+': Last Lap: Sector 2</small>';}
  if(idx==26){ return '<small>'+(idx)+': Last Lap: Sector 3</small>';}
  if(idx==27){ return '<small>'+(idx)+': Best Lap: Time</small>';}
  if(idx==28){ return '<small>'+(idx)+': Best Lap: Sector 1</small>';}
  if(idx==29){ return '<small>'+(idx)+': Best Lap: Sector 2</small>';}
  if(idx==30){ return '<small>'+(idx)+': Best Lap: Sector 3</small>';}
  if(idx==31){ return '<small>'+(idx)+': Delta: Driver Best Lap</small>';}
  if(idx==32){ return '<small>'+(idx)+': Delta: All Cars Best Lap</small>';}
  if(idx==33){ return '<small>'+(idx)+': Pit Stop: Count</small>';}
  if(idx==34){ return '<small>'+(idx)+': Pit Stop: Age</small>';}
  if(idx==35){ return '<small>'+(idx)+': Pit Stop: Delta</small>';}
  if(idx==36){ return '<small>'+(idx)+': Pit Stop: Exit Prediction</small>';}
  if(idx==37){ return '<small>'+(idx)+': RaceApp.eu: Tag</small>';}
  if(idx==38){ return '<small>'+(idx)+': RA.eu: Tag Pos #</small>';}
  if(idx==39){ return '<small>'+(idx)+': RA.eu: Tag Gap in Class</small>';}
  if(idx==40){ return '<small>'+(idx)+': RA.eu: Tag Current Champ Pos</small>';}
  if(idx==41){ return '<small>'+(idx)+': RA.eu: Tag Current Champ Pts</small>';}
  if(idx==42){ return '<small>'+(idx)+': RaceApp.eu: Championship Pred Change</small>';}
  if(idx==43){ return '<small>'+(idx)+': RaceApp.eu: Tag Predicted Champ Pos</small>';}
  if(idx==44){ return '<small>'+(idx)+': RaceApp.eu: Tag Predicted Champ Pts</small>';}

  return (idx) + ': ERROR';
}
