class Dice {
    constructor(component, initialVal = 1) {
        this.isStored = false;
        this.component = component;
        this.currentValue = initialVal;
        this.setValue(initialVal);
        this.isThrowing = false;
        this.storeUpdate = [];
    }

    onStore(callback) {
        this.storeUpdate.push(callback);
    }

    /**
     * Updates the dices score and draws a new version, if the dice is sotred, nothing happens
     * @param {Number} val the value the dice should be
     * @throws If val is less than 1 or bigger than 6
     * @returns {boolean} IF the dice was updated or not
     */
    setValue(val) {
        if (val < 1 || val > 6) { throw "That value is not allowed"; }
        if (this.isStored) return false;

        this.currentValue = val;

        const dices = (() => {
            switch (val) {
                case 1:
                    this.component.classList = "one";
                    return [{ x: 50, y: 50 }];
                case 2:
                    this.component.classList = "two";
                    return [{ x: 75, y: 75 }, { x: 25, y: 25 }];
                case 3:
                    this.component.classList = "three";
                    return [{ x: 75, y: 75 }, { x: 50, y: 50 }, { x: 25, y: 25 }];
                case 4:
                    this.component.classList = "four";
                    return [{ x: 75, y: 75 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 25, y: 25 }];
                case 5:
                    this.component.classList = "five";
                    return [{ x: 75, y: 75 }, { x: 75, y: 25 }, { x: 50, y: 50 }, { x: 25, y: 75 }, { x: 25, y: 25 }];
                case 6:
                    this.component.classList = "six";
                    return [{ x: 75, y: 75 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 25, y: 25 }];
            }
        })();

        this.component.innerHTML = "";
        dices.forEach(v => {
            this.component.innerHTML += `<dot style="top: ${(v.y / 100) * 150 - 10}px;left: ${(v.x / 100) * 150 - 10}px;"></dot>`;
        });

        return true;
    }

    /**
     * Plays a little animation and changes the dice state only if the dice isn't held. If the dice is already being thrown it can't be thrown again.
     * @returns {Prommise} A prommise that resolves when the animation finnished playing
     */
    throw() {
        return new Promise((resolve, reject) => {
            if (this.isThrowing) { return; }
            this.isThrowing = true;
            if (this.isStored) {
                this.component.style.animation = 'shake .3s';
            } else {
                this.component.style.animation = 'animateUp .3s';
            }
            this.setValue(Dice.getRandom());
            setTimeout(() => {
                this.isThrowing = false;
                this.component.style.animation = "";
                resolve(this.currentValue);
            }, 300);
        })
    }

    /**
     * Set the dice stored to either false or true
     * @param {boolean} shouldStore If the dice is stored or not
     */
    store(shouldStore) {
        this.isStored = shouldStore;

        this.storeUpdate.forEach(v => {
            v();
        })

        if (this.isStored) {
            this.component.classList.add("stored")
        } else {
            this.component.classList.remove("stored")
        }
    }

    static getRandom() {
        return Math.floor(Math.random() * Math.floor(6)) + 1;
    }
}

const dices = [];
let amountLeft = 2;
let currentScore = 0;
let currentSelectedScore = 0;
const amountLeftCounter = document.querySelector(".score");

[...document.querySelectorAll("dice")].forEach(v => {
    const dice = new Dice(v, Dice.getRandom());

    dice.onStore(() => {
        currentSelectedScore = 0;
        dices.forEach(v => {
            if(v.isStored)
            currentSelectedScore += v.currentValue;
        });
        setInfoBox();
    })

    dice.component.addEventListener("click", () => {
        dice.store(!dice.isStored);
    });

    dices.push(dice);
});

function setInfoBox() {
    document.getElementById("info-box").innerHTML = `
    <table>
        <tbody>
            <tr>
                <td>Selected</td>
                <td>${currentSelectedScore}p</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>${currentScore}p</td>
            </tr>
        </tbody>
    </table>`;
}

function reset() {
    dices.forEach(v => {
        v.store(false);
    });
    amountLeft = 3;
    amountLeftCounter.innerHTML = amountLeft;
    rollAllDice();
}

function rollAllDice() {
    if (amountLeft == 0) { return; }
    if (dices.map(v => v.isThrowing).includes(true)) { return; }
    let currentWait = 0;
    let score = 0;
    let currentFinished = 0;

    dices.forEach(v => {
        setTimeout(() => {
            v.throw()
                .then(v => {
                    score += v;
                    currentFinished++;
                    if (currentFinished == dices.length) {
                        amountLeft--;
                        currentScore = score;
                        setInfoBox();
                        amountLeftCounter.innerHTML = amountLeft;
                    }
                })
        }, currentWait);
        currentWait += 100;
    });
}

document.addEventListener("keyup", e => {
    if (e.keyCode !== 32) return;
    e.preventDefault();
    rollAllDice();
});

document.querySelector(".roll").addEventListener("click", rollAllDice);
document.querySelector(".reset").addEventListener("click",reset);
setInfoBox();
reset();