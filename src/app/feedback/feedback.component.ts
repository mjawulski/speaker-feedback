import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "angularfire2/firestore";
import { Session } from "./session.model";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
  encapsulation: ViewEncapsulation.Native
})
export class FeedbackComponent implements OnInit {
  @Input() sid: string;

  private sessionDoc: AngularFirestoreDocument<Session>;
  session: Observable<Session>;
  sessionObject: Session;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.sessionDoc = this.afs.doc<Session>("sessions/" + this.sid);
    this.session = this.sessionDoc.valueChanges();

    this.session.subscribe(session => {
      this.sessionObject = session;
    });
  }

  vote(option: "green" | "yellow" | "red") {
    const vote = {};
    vote[option] = this.sessionObject[option] + 1;
    this.sessionDoc.update(vote);
  }
}
