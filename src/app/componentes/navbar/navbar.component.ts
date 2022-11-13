import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) {

  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }



  ngOnInit(): void {
  }

}
