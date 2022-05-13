/**
 * render
 * @param {*} data
 * @param {*} type
 * @param {*} row
 * @returns
 */
export default function serie_badge(data, type, row) {
  if ( row['serie'] == '0') { return '<span class="badge badge-dark">GT3</span>';} //GT3
  else if ( row['serie'] == '1') { return '<span class="badge badge-purple">GT4</span>';} //GT4
  else if ( row['serie'] == '2') { return '<span class="badge badge-danger">CHL</span>';} //CHL
  else if ( row['serie'] == '3') { return '<span class="badge badge-warning">ST</span>';} //ST
  else if ( row['serie'] == '4') { return '<span class="badge badge-success">CUP</span>';} //CUP
  else if ( row['serie'] == '5') { return '<span class="badge badge-primary">TCX</span>';} //TCX
  else if ( row['serie'] == '299') { return '?';} //NONE
  else { return 'Error';}
}