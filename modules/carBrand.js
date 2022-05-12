export default function carbrand (data, type, row) {
  if ( row['carBrand'] == 'Mercedes-AMG') { return '<span class="car-mercedes-benz"></span>';}
  else if ( row['carBrand'] == 'Honda') { return '<span class="car-honda"></span>';}
  else if ( row['carBrand'] == 'McLaren') { return '<span class="car-mclaren"></span>';}
  else if ( row['carBrand'] == 'Audi') { return '<span class="car-audi"></span>';}
  else if ( row['carBrand'] == 'Porsche') { return '<span class="car-porsche"></span>';}
  else if ( row['carBrand'] == 'Lamborghini') { return '<span class="car-lamborghini"></span>';}
  else if ( row['carBrand'] == 'Mercedes') { return '<span class="car-mercedes-benz"></span>';}
  else if ( row['carBrand'] == 'Aston') { return '<span class="car-aston-martin"></span>';}
  else if ( row['carBrand'] == 'Lexus') { return '<span class="car-lexus"></span>';}
  else if ( row['carBrand'] == 'BMW') { return '<span class="car-bmw"></span>';}
  else if ( row['carBrand'] == 'Ginetta') { return '';}
  else if ( row['carBrand'] == 'KTM') { return '';}
  else if ( row['carBrand'] == 'Chevrolet') { return '<span class="car-chevrolet"></span>';}
  else if ( row['carBrand'] == 'Alpine') { return '';}
  else if ( row['carBrand'] == 'Maserati') { return '<span class="car-maserati"></span>';}
  else if ( row['carBrand'] == 'Ferrari') { return '<span class="car-ferrari"></span>';}
  else if ( row['carBrand'] == 'Nissan') { return '<span class="car-nissan"></span>';}
  else if ( row['carBrand'] == 'Ferrari') { return '<span class="car-ferrari"></span>';}
  else if ( row['carBrand'] == 'Bentley') { return '<span class="car-bentley"></span>';}
  else if ( row['carBrand'] == 'Jaguar') { return '<span class="car-jaguar"></span>';}
  else if ( row['carBrand'] == 'Reiter') { return '';}
  else {
    return '';
  }
}
//https://garyrowe.co.uk/acc/car-makes-icons-1.1.1/dist/demo.html