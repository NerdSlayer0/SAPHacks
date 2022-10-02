
showEvent();


async function showEvent() {
    try {
        let response = await fetch("/showEvent", {
            method: "GET",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            }
        });
        let parsed = await response.json();
        document.getElementById("location_listing").innerHTML = `Location: ${parsed.newEvent} \n`;
        document.getElementById("event-type").innerHTML = `Event Type: ${parsed.newType} \n`;
        document.getElementById("subject").innerHTML = `Location: ${parsed.newSubject} \n`;
    } catch (error) {
        console.log(error);
    }
}

    document.getElementById("schedule").onClick = () => schedule(); //when someone makes a customized event, send an invite

    function schedule() {
        // code to update schedule
    };
    // let str = "<option value=";
    // document.getElementById("event-type").innerHTML = str;