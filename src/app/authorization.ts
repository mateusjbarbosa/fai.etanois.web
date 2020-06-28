import { HttpHeaders } from "@angular/common/http"


 //exportando header sessão
 export  var header_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': 'Bearer '+sessionStorage.getItem('token')
  });



