export default function cup_badge(data, type, row) {
  if ( row['cupCategory'] == '0') {
    //Pro
    return '<span class="badge badge-light">PRO</span>';
  } else if ( row['cupCategory'] == '1') { return '<span class="badge badge-dark">PRO-AM</span>';} //ProAm
  else if ( row['cupCategory'] == '2') { return '<span class="badge badge-danger">AM</span>';} //Am
  else if ( row['cupCategory'] == '3') { return '<span class="badge text-dark badge-light">SILVER</span>';} //Silver
  else if ( row['cupCategory'] == '4') { return '<span class="badge text-dark badge-light">NATIONAL</span>';} //National
  else { return 'Error';}
}