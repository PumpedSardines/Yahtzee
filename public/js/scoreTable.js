class ScoreTable {
    constructor(component, style, players) {
        this.component = component;

        const playerString = players.map(v => `<th>${v}</th>`).join("");
        this.component.innerHTML = `<tbody><tr><th width="30%">Score</th>${playerString}</tr>` +
            style.map(v => {
                if (v === "BREAK") { return "<tr><th width=\"30%\"><span style=\"opacity:0;\">t</span></th>" + players.map(_ => "<th></th>").join("") + "</tr>"; }
                let returnString = `<tr><td width="30%">${v}</td>`;
                players.forEach(el => {
                    returnString += "<td><input style=\"width: 100%;\" /></td>";
                });
                returnString += "</tr>";
                return returnString;
            }).join("") + "</tbody>";
    }
}

const players = ["Fritiof", "Jens"];
const swedenStyle = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "bonus (>=63, 50p)",
    "BREAK",
    "pair",
    "two pair",
    "three of a kind",
    "four of a kind",
    "full house",
    "small straight (15p)",
    "big straight (20p)",
    "yatze",
    "chance",
    "BREAK",
    "final score"
];

const wanky = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "bonus (>=63, 35p)",
    "BREAK",
    "three of a kind",
    "four of a kind",
    "full house (25p)",
    "small straight (30p)",
    "big straight (40p)",
    "yatze (50p)",
    "yatze bonus (100p)",
    "chance",
    "BREAK",
    "final score"
];

const scoreTable = new ScoreTable(document.getElementById("score-table"), wanky, players);