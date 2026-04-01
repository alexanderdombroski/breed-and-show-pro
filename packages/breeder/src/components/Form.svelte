<script lang="ts">
const { label, title } = $props();
const MS_PER_DAY = 24 * 60 * 60 * 1000;

let value: string = $state("");
let bredDate: number;
let confirmBredDate: number;
let farrowingDate: number;
let sixMonthDate: number;

function formatDate(date: Date): string {
    console.log("date: ",date);
    const options: Intl.DateTimeFormatOptions = { 
    year: "numeric", month: "long", day: "2-digit", weekday: "short"
    };
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate;
}

function addDays(timestamp: number, days: number): number {
    return timestamp + days * MS_PER_DAY;
}

function calculateDates(label: string, value: string) {
    console.log("calculateDates | label: ", label, " value: ", value);
    let response;
    if (label === "breeding-date") {
        bredDate = value ? new Date(value).getTime() : 0;
        if (bredDate && !farrowingDate && !sixMonthDate) {
            confirmBredDate = addDays(bredDate, 30);
            farrowingDate = addDays(bredDate, 144);
            sixMonthDate = addDays(bredDate, 327);
        }
        response = bredDate ? formatDate(new Date(bredDate)) : "";
    } else if (label === "confirm-bred-date") {
        confirmBredDate = value ? new Date(value).getTime() : addDays(bredDate, 30);
        response = confirmBredDate ? formatDate(new Date(confirmBredDate)) : "";
    } else if (label === "farrowing-due-date") {
        farrowingDate = value ? new Date(value).getTime() : addDays(bredDate, 144);
        if (farrowingDate && !bredDate && !sixMonthDate) {
            bredDate = addDays(farrowingDate, -144);
            confirmBredDate = addDays(bredDate, 30);
            sixMonthDate = addDays(bredDate, 327);
        }
        response = farrowingDate ? formatDate(new Date(farrowingDate)) : "";
    } else if (label === "six-months-old") {
        sixMonthDate = value ? new Date(value).getTime() : addDays(bredDate, 327);
        if (sixMonthDate && !bredDate && !farrowingDate) {
            bredDate = addDays(sixMonthDate, -327);
            confirmBredDate = addDays(bredDate, 30);
            farrowingDate = addDays(bredDate, 144);
        }
        response = sixMonthDate ? formatDate(new Date(sixMonthDate)) : "";
    }
    console.log("response: ", response);
    return response;
}

</script>

<form>
    <label for={label}>{title}</label>
    <hr>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"> <!--Font Awesome Pro v7.2.0 by @fontawesome Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>
    <input type="date" id={label} name={label} bind:value={value} onchange={() => calculateDates(label, value)} />
    {#if value}
        <div>{calculateDates(label, value)}</div>
    {/if}
</form>

<style>
    form {
        background: rgb(248, 245, 228);
        border-radius: 8px;
        margin: 20px 10px;
        padding: 1em 0.75em;
        border-left: 8px solid #f9ee9b;
        min-width: 300px;
    }
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5em;
    }
    input {
        padding: 0.5em;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: rgb(255, 252, 243);
    }
    svg {
        width: 1.5em;
        height: 1.5em;
        fill: #555;
        vertical-align: middle;
        margin-right: 0.5em;
    }
    div {
        margin-top: 0.3em;
        font-size: 1.5em;
        color: #555;
    }
</style>