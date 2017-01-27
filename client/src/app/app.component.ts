import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = `Three Rings for the Elven-kings under the sky,
          Seven for the Dwarf-lords in halls of stone,
          Nine for Mortal Men, doomed to die,
          One for the Dark Lord on his dark throne
          In the Land of Mordor where the Shadows lie.
          One Ring to rule them all, One Ring to find them,
          One Ring to bring them all and in the darkness bind them.
          In the Land of Mordor where the Shadows lie.`;
}
