import { Injectable } from "@angular/core";
import { EventData } from "../temporary-utils/data";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";

@Injectable()
export class EventService {
	eventDocument!: AngularFirestoreDocument<EventData>;
	eventCollection!: AngularFirestoreCollection<EventData>;

	constructor(private db: AngularFirestore) {}

	insert(event: EventData): Promise<EventData> {
		// this.eventDocument = this.db.doc(`events/`);
		return new Promise((resolve) => {
			this.db
				.collection("events")
				.doc(event.uuid)
				.set(event)
				.then((r) => resolve(event))
				.catch((e) => resolve(e));
		});
	}

	update(event: EventData, uuid: string) {
		// this.db
		// 	.list("event")
		// 	.update(uuid, event)
		// 	.then((result) => console.log(result))
		// 	.catch((e) => console.error(e));
	}

	findAll(uuidUser: string): Promise<EventData[]> {
		return new Promise((resolve) => {
			// this.db
			// 	.collection("events")
			// 	.doc("fe99b6a6-0bf0-475c-b45e-45ba53f09580")
			// 	.valueChanges()
			// 	.subscribe((e) => console.log(e));
			this.eventCollection = this.db.collection("events", (ref) =>
				ref.where("uuidUser", "==", uuidUser)
			);
			this.eventCollection.valueChanges().subscribe((e) => resolve(e));
		});
	}

	delete(uuid: string) {
		// this.db
		// 	.object(`event/${uuid}`)
		// 	.remove()
		// 	.catch((e) => console.error(e));
	}
}
