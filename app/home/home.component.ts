import {Component, Pipe, PipeTransform, NgZone, ChangeDetectionStrategy} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {PageHeader} from '../page_header/page_header.component';

import { SmartHomeService } from '../SH.Service/smarthome.service';

declare var _ : any;

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
@Pipe({name : 'lightsOn'})
export class LightsOnPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var tmp =  _.reduce(_.values(value),function(memo,i){
      return memo+_.reduce(_.values(i),function(mem,j){
        return j.on?1:0;
      },0);
    ;},0);
    return tmp;
  }
}

@Component({
  // HTML selector for this component
  selector: 'home',
  templateUrl: './app/home/home.html',
  directives: [PageHeader, ROUTER_DIRECTIVES],
  providers: [SmartHomeService],
  pipes: [KeysPipe,LightsOnPipe]
})

export class Home {

    rpi : any;

    ngOnInit() {
      this.rpi = this.sh.rpi$;
    }

  	constructor(private sh: SmartHomeService, private zone:NgZone) {

    }

    shut(ip,j) {
      this.sh.changeValue(ip,j,0);
    }

}
