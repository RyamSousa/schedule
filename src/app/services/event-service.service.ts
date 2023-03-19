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

	constructor(private db: AngularFirestore) {
		this.eventDocument = db.doc("events/event");
	}

	insert(event: EventData): Promise<EventData> {
		return new Promise((resolve) => {
			this.eventDocument
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

	findAll() {
		// this.db
		// 	.list("event")
		// 	.snapshotChanges()
		// 	.pipe(
		// 		map((changes) => {
		// 			return changes.map((e) => ({
		// 				key: e.payload.key,
		// 				...e.payload.val,
		// 			}));
		// 		})
		// 	);
	}

	delete(uuid: string) {
		// this.db
		// 	.object(`event/${uuid}`)
		// 	.remove()
		// 	.catch((e) => console.error(e));
	}
}
