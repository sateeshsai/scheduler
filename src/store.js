import { writable } from "svelte/store";

export let users = writable([
  {
    name: "John Doe",
    email: "jdoe",
  },
  {
    name: "Barney Rubbles",
    email: "brubbles",
  },
  {
    name: "Jeff Lebowski",
    email: "jlebowski",
  },
]);

export let projects = writable([
  {
    id: 1,
    projectName: "Sample project",
    startDate: "2022-02-06T10:20:30",
    endDate: "2022-02-07T10:20:30",
    status: "In-progress",
    assignedTo: "brubbles",
  },
  {
    id: 2,
    projectName: "Second project",
    startDate: "2022-02-08T10:20:30",
    endDate: "2022-02-10T10:20:30",
    status: "In-progress",
    assignedTo: "brubbles",
  },
  {
    id: 3,
    projectName: "Third project",
    startDate: "2022-02-09T10:20:30",
    endDate: "2022-02-10T10:20:30",
    status: "In-progress",
    assignedTo: "jlebowski",
  },
  {
    id: 4,
    projectName: "Sample project 2",
    startDate: "2022-02-09T10:20:30",
    endDate: "2022-02-11T10:20:30",
    status: "Completed",
    assignedTo: "jdoe",
  },
  {
    id: 5,
    projectName: "Sample project 3",
    startDate: "2022-02-07T10:20:30",
    endDate: "2022-02-10T10:20:30",
    status: "Completed",
    assignedTo: "jlebowski",
  },
]);
