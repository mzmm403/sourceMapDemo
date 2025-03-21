import { defineStore } from "pinia";
import type { eventWithTime } from '@rrweb/types'

interface EventState {
    events: eventWithTime[]
}

export const useEventStore = defineStore("event",{
    state: (): EventState => ({
        events: []
    }),
    getters: {},
    actions: {
        setEvents(event: any) {
            this.events = (event);
        },
        getEvents() {
            return this.events;
        }
    }
}) as any