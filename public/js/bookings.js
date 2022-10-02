let loc;

async function showEvent1() {
    try {
        let response = await fetch("/showEvent1", {
            method: "GET",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            }
        });
        let parsed = await response.json();
        document.getElementById("attendees").innerHTML = `Attendees: ${parsed.newAttendees} \n`;
    } catch (error) {
        console.log(error);
    }
}

async function showEvent2() {
  try {
      let response = await fetch("/showEvent2", {
          method: "GET",
          headers: {
              "Accept": 'application/json',
              "Content-Type": 'application/json'
          }
      });
      let parsed = await response.json();
      loc = parsed.newLocation;
      document.getElementById("location_listing").innerHTML = `Location: ${parsed.newLocation} \n`;
      document.getElementById("event-type").innerHTML = `Event Type: ${parsed.newType} \n`;
      document.getElementById("subject").innerHTML = `Location: ${parsed.newSubject} \n`;
  } catch (error) {
      console.log(error);
  }
}

async function showEvent3() {
  try {
      let response = await fetch("/showEvent3", {
          method: "GET",
          headers: {
              "Accept": 'application/json',
              "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            eventLocation: loc
          })
      });
      let parsed = await response.json();
  } catch (error) {
      console.log(error);
  }
}


document.getElementById("subject").innerHTML += localStorage.getItem("inPerson") == "0" ? "Coffee" : "Wordle";
document.getElementById("event-type").innerHTML += localStorage.getItem("inPerson") == "0" ? "In Person" : "Online";
document.getElementById("location_listing").innerHTML += localStorage.getItem("inPerson") == "0" ? "Coffee Room" : "https://www.wordle.com";

    // document.getElementById("schedule").onClick = () => schedule(); //when someone makes a customized event, send an invite

    // function schedule() {
        // code to update schedule
    // };
    // let str = "<option value=";
    // document.getElementById("event-type").innerHTML = str;