// ==========================================
// POCKETSMART AI - SCRIPT.JS
// ==========================================


// ==========================================
// CHAT FUNCTION
// ==========================================

async function sendMessage() {

    const input =
        document.getElementById("message");

    const chatBox =
        document.getElementById("chat-box");

    const message =
        input.value.trim();


    // Don't send empty messages
    if (!message) {
        return;
    }


    // ------------------------------
    // Show user's message
    // ------------------------------

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "message user-message";


    userMessage.innerHTML = `
        <strong>You:</strong>
        <p></p>
    `;


    userMessage.querySelector("p")
        .textContent = message;


    chatBox.appendChild(userMessage);


    // Clear input
    input.value = "";


    // Scroll to bottom
    chatBox.scrollTop =
        chatBox.scrollHeight;


    // ------------------------------
    // Show loading message
    // ------------------------------

    const loadingMessage =
        document.createElement("div");

    loadingMessage.className =
        "message bot-message";

    loadingMessage.innerHTML = `
        <strong>PocketSmart:</strong>
        <p>🤖 Thinking...</p>
    `;

    chatBox.appendChild(loadingMessage);


    chatBox.scrollTop =
        chatBox.scrollHeight;


    // ------------------------------
    // Send message to FastAPI
    // ------------------------------

    try {

        const response =
            await fetch("/chat", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    message: message

                })

            });


        if (!response.ok) {

            throw new Error(
                "Server error"
            );

        }


        const data =
            await response.json();


        // Remove loading message
        loadingMessage.remove();


        // ------------------------------
        // Show AI response
        // ------------------------------

        const botMessage =
            document.createElement("div");

        botMessage.className =
            "message bot-message";


        botMessage.innerHTML = `
            <strong>PocketSmart:</strong>
            <p></p>
        `;


        botMessage.querySelector("p")
            .textContent =
            data.response ||
            "Sorry, I couldn't generate a response.";


        chatBox.appendChild(botMessage);


        chatBox.scrollTop =
            chatBox.scrollHeight;

    }


    catch (error) {

        console.error(error);


        loadingMessage.remove();


        const errorMessage =
            document.createElement("div");

        errorMessage.className =
            "message bot-message";


        errorMessage.innerHTML = `
            <strong>⚠️ PocketSmart:</strong>
            <p>
                Sorry, I couldn't connect
                to the AI server.
            </p>
        `;


        chatBox.appendChild(errorMessage);


        chatBox.scrollTop =
            chatBox.scrollHeight;

    }

}



// ==========================================
// ENTER KEY FOR CHAT
// ==========================================

function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}



// ==========================================
// OPEN / CLOSE PLANNERS
// ==========================================

function togglePlanner(plannerId) {

    const selectedPlanner =
        document.getElementById(plannerId);


    const allPlanners =
        document.querySelectorAll(
            ".planner-content"
        );


    const allArrows =
        document.querySelectorAll(
            ".arrow"
        );


    // --------------------------------------
    // Close all other planners
    // --------------------------------------

    allPlanners.forEach(
        function(planner) {

            if (planner.id !== plannerId) {

                planner.classList
                    .remove("active");

            }

        }
    );


    // --------------------------------------
    // Reset all arrows
    // --------------------------------------

    allArrows.forEach(
        function(arrow) {

            arrow.classList
                .remove("open");

        }
    );


    // --------------------------------------
    // Open / close selected planner
    // --------------------------------------

    selectedPlanner.classList.toggle(
        "active"
    );


    // --------------------------------------
    // Rotate selected arrow
    // --------------------------------------

    if (
        selectedPlanner.classList
            .contains("active")
    ) {

        if (plannerId === "partyPlanner") {

            document
                .getElementById("partyArrow")
                .classList.add("open");

        }


        if (plannerId === "homePlanner") {

            document
                .getElementById("homeArrow")
                .classList.add("open");

        }


        if (plannerId === "jewelryPlanner") {

            document
                .getElementById("jewelryArrow")
                .classList.add("open");

        }

    }

}



// ==========================================
// HOME INTERIOR PLANNER
// ==========================================

async function generateHomePlan() {

    const room =
        document.getElementById(
            "roomType"
        ).value;


    const budget =
        document.getElementById(
            "homeBudget"
        ).value;


    const style =
        document.getElementById(
            "homeStyle"
        ).value;


    const result =
        document.getElementById(
            "homeResult"
        );


    // --------------------------------------
    // Validate
    // --------------------------------------

    if (!budget) {

        result.innerHTML = `
            ⚠️ Please enter your home
            interior budget.
        `;

        return;

    }


    // --------------------------------------
    // Loading
    // --------------------------------------

    result.innerHTML = `
        🤖 PocketSmart AI is creating
        your home interior plan...
    `;


    // --------------------------------------
    // Send to FastAPI
    // --------------------------------------

    try {

        const response =
            await fetch(
                "/generate-home",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        room_type: room,

                        budget: budget,

                        style: style

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Home planner server error"
            );

        }


        const data =
            await response.json();


        // ----------------------------------
        // Show AI result
        // ----------------------------------

        result.innerHTML = `
            <h3>
                🏠 Your Home Interior Plan
            </h3>

            <p>
                ${formatResponse(
                    data.response
                )}
            </p>
        `;

    }


    catch (error) {

        console.error(error);


        result.innerHTML = `
            ⚠️ Unable to connect
            to the AI server.
            <br><br>
            Please check whether
            FastAPI is running.
        `;

    }

}



// ==========================================
// PARTY PLANNER
// ==========================================

async function generatePartyPlan() {

    const partyType =
        document.getElementById(
            "partyType"
        ).value;


    const guests =
        document.getElementById(
            "guestCount"
        ).value;


    const budget =
        document.getElementById(
            "partyBudget"
        ).value;


    const theme =
        document.getElementById(
            "partyTheme"
        ).value;


    const result =
        document.getElementById(
            "partyResult"
        );


    // --------------------------------------
    // Validate
    // --------------------------------------

    if (!guests) {

        result.innerHTML = `
            ⚠️ Please enter the
            number of guests.
        `;

        return;

    }


    if (!budget) {

        result.innerHTML = `
            ⚠️ Please enter
            your party budget.
        `;

        return;

    }


    // --------------------------------------
    // Loading
    // --------------------------------------

    result.innerHTML = `
        🤖 PocketSmart AI is creating
        your party plan...
    `;


    // --------------------------------------
    // Send to FastAPI
    // --------------------------------------

    try {

        const response =
            await fetch(
                "/generate-party",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        party_type:
                            partyType,

                        guests:
                            guests,

                        budget:
                            budget,

                        theme:
                            theme

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Party planner server error"
            );

        }


        const data =
            await response.json();


        // ----------------------------------
        // Show AI result
        // ----------------------------------

        result.innerHTML = `
            <h3>
                🎉 Your Party Plan
            </h3>

            <p>
                ${formatResponse(
                    data.response
                )}
            </p>
        `;

    }


    catch (error) {

        console.error(error);


        result.innerHTML = `
            ⚠️ Unable to connect
            to the AI server.
            <br><br>
            Please check whether
            FastAPI is running.
        `;

    }

}



// ==========================================
// JEWELRY PLANNER
// ==========================================

async function generateJewelryPlan() {

    const jewelryType =
        document.getElementById(
            "jewelryType"
        ).value;


    const occasion =
        document.getElementById(
            "occasion"
        ).value;


    const budget =
        document.getElementById(
            "jewelryBudget"
        ).value;


    const material =
        document.getElementById(
            "material"
        ).value;


    const result =
        document.getElementById(
            "jewelryResult"
        );


    // --------------------------------------
    // Validate
    // --------------------------------------

    if (!budget) {

        result.innerHTML = `
            ⚠️ Please enter
            your jewelry budget.
        `;

        return;

    }


    // --------------------------------------
    // Loading
    // --------------------------------------

    result.innerHTML = `
        🤖 PocketSmart AI is creating
        your jewelry recommendation...
    `;


    // --------------------------------------
    // Send to FastAPI
    // --------------------------------------

    try {

        const response =
            await fetch(
                "/generate-jewelry",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        jewelry_type:
                            jewelryType,

                        occasion:
                            occasion,

                        budget:
                            budget,

                        material:
                            material

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Jewelry planner server error"
            );

        }


        const data =
            await response.json();


        // ----------------------------------
        // Show AI result
        // ----------------------------------

        result.innerHTML = `
            <h3>
                💎 Your Jewelry Recommendation
            </h3>

            <p>
                ${formatResponse(
                    data.response
                )}
            </p>
        `;

    }


    catch (error) {

        console.error(error);


        result.innerHTML = `
            ⚠️ Unable to connect
            to the AI server.
            <br><br>
            Please check whether
            FastAPI is running.
        `;

    }

}



// ==========================================
// FORMAT AI RESPONSE
// ==========================================

function formatResponse(text) {

    if (!text) {

        return "No recommendation received.";

    }


    /*
       Convert new lines from Gemini
       into HTML line breaks.
    */

    return text
        .replace(/\n/g, "<br>");

}