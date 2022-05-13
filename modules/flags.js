/**
 * create a display flag based on the given value
 *
 * @param {*} data
 * @param {*} type
 * @param {*} row
 * @returns some html forming a flag icon
 */
export default function render_flag(data, type, row) {
  if (type === 'display') {
    if (data === 0) {
      return '';
    } else if ( data == '1') { return '<span class="fi fi-it"></span>';}
      else if ( data == '2') { return '<span class="fi fi-de"></span>';}
      else if ( data == '3') { return '<span class="fi fi-fr"></span>';}
      else if ( data == '4') { return '<span class="fi fi-es"></span>';}
      else if ( data == '5') { return '<span class="fi fi-gb"></span>';}
      else if ( data == '6') { return '<span class="fi fi-hu"></span>';}
      else if ( data == '7') { return '<span class="fi fi-be"></span>';}
      else if ( data == '8') { return '<span class="fi fi-ch"></span>';}
      else if ( data == '9') { return '<span class="fi fi-at"></span>';}
      else if ( data == '10') { return '<span class="fi fi-ru"></span>';}
      else if ( data == '11') { return '<span class="fi fi-th"></span>';}
      else if ( data == '12') { return '<span class="fi fi-nl"></span>';}
      else if ( data == '13') { return '<span class="fi fi-pl"></span>';}
      else if ( data == '14') { return '<span class="fi fi-ar"></span>';}
      else if ( data == '15') { return '<span class="fi fi-mc"></span>';}
      else if ( data == '16') { return '<span class="fi fi-ie"></span>';}
      else if ( data == '17') { return '<span class="fi fi-br"></span>';}
      else if ( data == '18') { return '<span class="fi fi-za"></span>';}
      else if ( data == '19') { return '<span class="fi fi-pr"></span>';}
      else if ( data == '20') { return '<span class="fi fi-sk"></span>';}
      else if ( data == '21') { return '<span class="fi fi-om"></span>';}
      else if ( data == '22') { return '<span class="fi fi-gr"></span>';}
      else if ( data == '23') { return '<span class="fi fi-sa"></span>';}
      else if ( data == '24') { return '<span class="fi fi-no"></span>';}
      else if ( data == '25') { return '<span class="fi fi-tr"></span>';}
      else if ( data == '26') { return '<span class="fi fi-kr"></span>';}
      else if ( data == '27') { return '<span class="fi fi-lb"></span>';}
      else if ( data == '28') { return '<span class="fi fi-am"></span>';}
      else if ( data == '29') { return '<span class="fi fi-mx"></span>';}
      else if ( data == '30') { return '<span class="fi fi-se"></span>';}
      else if ( data == '31') { return '<span class="fi fi-fi"></span>';}
      else if ( data == '32') { return '<span class="fi fi-dk"></span>';}
      else if ( data == '33') { return '<span class="fi fi-hr"></span>';}
      else if ( data == '34') { return '<span class="fi fi-ca"></span>';}
      else if ( data == '35') { return '<span class="fi fi-cn"></span>';}
      else if ( data == '36') { return '<span class="fi fi-pt"></span>';}
      else if ( data == '37') { return '<span class="fi fi-sg"></span>';}
      else if ( data == '38') { return '<span class="fi fi-id"></span>';}
      else if ( data == '39') { return '<span class="fi fi-us"></span>';}
      else if ( data == '40') { return '<span class="fi fi-nz"></span>';}
      else if ( data == '41') { return '<span class="fi fi-au"></span>';}
      else if ( data == '42') { return '<span class="fi fi-sm"></span>';}
      else if ( data == '43') { return '<span class="fi fi-ae"></span>';}
      else if ( data == '44') { return '<span class="fi fi-lu"></span>';}
      else if ( data == '45') { return '<span class="fi fi-kw"></span>';}
      else if ( data == '46') { return '<span class="fi fi-hk"></span>';}
      else if ( data == '47') { return '<span class="fi fi-co"></span>';}
      else if ( data == '48') { return '<span class="fi fi-jp"></span>';}
      else if ( data == '49') { return '<span class="fi fi-ad"></span>';}
      else if ( data == '50') { return '<span class="fi fi-az"></span>';}
      else if ( data == '51') { return '<span class="fi fi-bg"></span>';}
      else if ( data == '52') { return '<span class="fi fi-cu"></span>';}
      else if ( data == '53') { return '<span class="fi fi-cz"></span>';}
      else if ( data == '54') { return '<span class="fi fi-ee"></span>';}
      else if ( data == '55') { return '<span class="fi fi-ge"></span>';}
      else if ( data == '56') { return '<span class="fi fi-in"></span>';}
      else if ( data == '57') { return '<span class="fi fi-il"></span>';}
      else if ( data == '58') { return '<span class="fi fi-jm"></span>';}
      else if ( data == '59') { return '<span class="fi fi-lv"></span>';}
      else if ( data == '60') { return '<span class="fi fi-lt"></span>';}
      else if ( data == '61') { return '<span class="fi fi-mo"></span>';}
      else if ( data == '62') { return '<span class="fi fi-my"></span>';}
      else if ( data == '63') { return '<span class="fi fi-np"></span>';}
      else if ( data == '64') { return '<span class="fi fi-nc"></span>';}
      else if ( data == '65') { return '<span class="fi fi-ne"></span>';}
      else if ( data == '66') { return '<span class="fi fi-gb-nir"></span>';}
      else if ( data == '67') { return '<span class="fi fi-pg"></span>';}
      else if ( data == '68') { return '<span class="fi fi-ph"></span>';}
      else if ( data == '69') { return '<span class="fi fi-qa"></span>';}
      else if ( data == '70') { return '<span class="fi fi-ro"></span>';}
      else if ( data == '71') { return '<span class="fi fi-gb-sct"></span>';}
      else if ( data == '72') { return '<span class="fi fi-rs"></span>';}
      else if ( data == '73') { return '<span class="fi fi-si"></span>';}
      else if ( data == '74') { return '<span class="fi fi-tw"></span>';}
      else if ( data == '75') { return '<span class="fi fi-ua"></span>';}
      else if ( data == '76') { return '<span class="fi fi-ve"></span>';}
      else if ( data == '77') { return '<span class="fi fi-gb-wls"></span>';}
      else if ( data == '78') { return '<span class="fi fi-ir"></span>';}
      else if ( data == '79') { return '<span class="fi fi-bh"></span>';}
      else if ( data == '80') { return '<span class="fi fi-zw"></span>';}
      else if ( data == '81') { return '<span class="fi fi-xx"></span>';}
      else if ( data == '82') { return '<span class="fi fi-cl"></span>';}
      else if ( data == '83') { return '<span class="fi fi-uy"></span>';}
      else if ( data == '84') { return '<span class="fi fi-mg"></span>';}
      else if ( data == '85') { return '<span class="fi fi-mt"></span>';}
      else if ( data == '86') { return '<span class="fi fi-gb-eng"></span>';
    } else {
      return '';
    }
  } else {
    return data
  }
}
