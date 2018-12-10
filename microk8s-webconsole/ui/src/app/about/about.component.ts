import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
  aboutTitle = 'About MicroK8s WebConsole';
  ngOnInit(): void {
  }

}
