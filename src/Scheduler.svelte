<script>
  import { users, projects } from "./store.js";
  import { range, getDaysArray, addDays } from "./helper.js";
  //GET CURRENT WEEK
  let curr = new Date(); // get current date
  let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  let last = first + 6; // last day is the first day + 6
  let lastdayNum = new Date(curr.setDate(last)).getDay();

  function firstDayOfWeek(dateObject, firstDayOfWeekIndex) {

const dayOfWeek = dateObject.getDay(),
    firstDayOfWeek = new Date(dateObject),
    diff = dayOfWeek >= firstDayOfWeekIndex ?
        dayOfWeek - firstDayOfWeekIndex :
        6 - dayOfWeek

firstDayOfWeek.setDate(dateObject.getDate() - diff)
firstDayOfWeek.setHours(0,0,0,0)

return firstDayOfWeek
}

// August 18th was a Saturday
let lastMonday = firstDayOfWeek(new Date(), 1)




  let weekDates = getDaysArray(lastMonday, addDays(lastMonday, 6), 1);
  console.log(weekDates)
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let standardGridAreas = [
    "event1",
    "event2",
    "event3",
    "event4",
    "event5",
    "event6",
    "event7",
  ].join(" ");

  function getGridAreas(project) {
    let gridAreas = ["1", "2", "3", "4", "5", "6", "7"];
    let startDay = new Date(project.startDate + "z").getDate() - curr.getDay();
    let endDay = new Date(project.endDate + "z").getDate() - curr.getDay();
    let numberOfDays = endDay - startDay;
    let eventAreas = "";
    [...Array(numberOfDays + 1).keys()].forEach(
      (day) => (eventAreas += "event ")
    );
    gridAreas.splice(startDay, numberOfDays + 1, eventAreas);
    project.gridareas = gridAreas;
    return gridAreas.join(" ");
  }

  // let resize;
  let currentElement;

  // function handleMouseDown(e) {
  //   e.preventDefault()
  //     window.addEventListener("mousemove", handleMouseMove);
  //     window.addEventListener("mouseup", handleMouseUp);
  //     currentElement = e.target;
  //     resize = true;
  //     console.log("MOUSE DOWN")
  // }

  // function handleMouseMove (e) {
  //   if(resize === true) console.log(currentElement.getBoundingClientRect().left)
  //   console.log("MOUSE MOVE")
  // }

  // function handleMouseUp (e) {
  //   resize = false;
  //   window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   console.log("MOUSE UP")
  // }

  let movedEvent

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.projectId);
    dragged = true;
    movedEvent = e.target;
    movedEvent.style.zIndex = 999;
  }


  function handleDrop(e) {
    let projectId = e.dataTransfer.getData("text/plain");
    let itemToMove = $projects.find((proj) => proj.id == projectId);
    //  console.table(itemToMove)
    itemToMove.assignedTo = e.currentTarget.dataset.toUser;
    // console.log(e.currentTarget.dataset.newFromDate);
    itemToMove.fromDate = new Date(e.currentTarget.dataset.newFromDate + "Z").toUTCString();
    
    $projects = $projects;
    console.log(itemToMove);
    dragged = false;
    movedEvent.style.zIndex = "auto";
  }

  function handleClick(e) {
  }

  let dragged;
</script>

<div class="scheduleContainer">
  <div class="row">
    <div class="name">Pursuit managers</div>
    <div class="daySegments">
      {#each weekDays as weekday, idx}
        <div class="segment">
          {weekday}
          <!-- <b>{weekDates[idx]} </b> -->
        </div>
      {/each}
    </div>
  </div>

  {#each $users as user, index (user)}
    <div class="row">
      <div class="name">{user.name}</div>
      <div class="timelineWrapper">
       
        <div class="timeline" >
          {#each $projects.filter((p) => p.assignedTo === user.email) as project, index (project)}
            <div
              class="daySegments"
             
              style="display: grid; 
          grid-template-columns: repeat(7, 1fr); 
          grid-template-areas:'{getGridAreas(project)}'"
            >
              <div
                class="event"
                draggable="true"
                style="grid-area:event"
                data-from-user={user.email}
                data-project-id={project.id}
                on:dragstart={handleDragStart}
                on:click={handleClick}
              >
                {project.projectName}
              </div>
            </div>
          {/each}
        </div>
        {#if dragged}
        <div class="timeline">
          <div
            class="daySegmentsBase"
            style="grid-template-areas:{standardGridAreas}"
          >
            {#each weekDates as date, idx}
              <div
                class="dropArea"
                style="grid-area:'{'event' + idx}'"
                data-to-user={user.email}
                data-new-from-date={date}
                on:drop={handleDrop}
                on:dragenter={(e) => e.preventDefault()}
                on:dragover={(e) => e.preventDefault()}
              >
                <!-- {date} -->
              </div>
            {/each}
          </div>
        </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .scheduleContainer {
    /* width: 100vw; */
    display: grid;
    gap: 1rem;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background: cornflowerblue;
  }

  .timelineWrapper {
    display: grid;
    /* grid-template-rows: repeat(auto, 1fr); */
    grid-template-areas: "content";
  }

  .timeline {
    grid-area: content;
  }

  .daySegmentsBase {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* position: absolute; */
    width: 100%;
    height: 100%;
    place-items: center;
  }

  .dropArea {
    display: grid;
    width: 100%;
    height: 100%;
    /* background-color: red; */
  }

  .daySegments {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* grid-template-areas: "b a a a a a event" */
  }

  .name {
    padding: 1rem;
  }

  .segment {
    /* width: 100%; */
    text-align: center;
    padding: 1rem;
  }

  .event {
    background: chocolate;
    display: grid;
    place-items: center;
    font-weight: bold;
    border: 1px solid red;
    padding: 1rem;
  }
</style>
