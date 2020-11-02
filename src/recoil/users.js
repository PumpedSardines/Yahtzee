import { atom } from "recoil";

export const _users = atom({
	key: "user",
	default: []
});

export const _started = atom({
	key: "started",
	default: false
})