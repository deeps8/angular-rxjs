import { Component, OnInit, OnDestroy } from "@angular/core";
import { NewsFeedService } from "../news-feed.service";
import { timer, Subscription, concat } from "rxjs";
import {} from "rxjs/operators";

@Component({
  selector: "latest-news",
  templateUrl: "./latest-news.component.html",
  styleUrls: ["./latest-news.component.css"],
})
export class LatestNewsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  //timer for fetching data on some time interval (api request in every 3 mins)
  refreshTimer$ = timer(0, 30000);

  news$;
  //newsfeed service injected to this component
  constructor(public newsfeed: NewsFeedService) {}

  ngOnInit() {
    this.subscription = this.refreshTimer$.subscribe(this.newsfeed.refresh$);
    //observable for news data
    this.news$ = this.newsfeed.news$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
