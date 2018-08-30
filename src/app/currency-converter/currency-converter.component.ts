import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  constructor(private http:Http) { }
  ngOnInit() { }
  url1 = 'http://free.currencyconverterapi.com/api/v5/convert?q=';
  url2 = '&compact=ultra';
  currency = ['USD','EGP','MAD','INR','CHF'];
  currencyRate =[];
  currencyTable;
  getCurrencyRate(currency1:string,currency2:string){
     this.http.get(this.url1+currency1+'_'+currency2+this.url2).subscribe(res=>{
      console.log(parseFloat(Object.values(JSON.parse(res['_body']))[0]+'').toFixed(3));
      let curRate= parseFloat(Object.values(JSON.parse(res['_body']))[0]+'');
      this.currencyRate.push(curRate);
    });
  }

  fetchRate(){
      for(let item of this.currency){
        this.getCurrencyRate('USD',item);
      }
  }

  displayChart(){
    let temp1=[];
      for(let i = 0;i<this.currencyRate.length;i++){
        let temp2=[];
        for(let j=0;j<this.currencyRate.length;j++){
          temp2.push((this.currencyRate[i]/this.currencyRate[j]));
        }
        temp1.push(temp2);
        temp2=[];
      }
      this.currencyTable =temp1;
  }
}
