/**
* Game1221.js
* The game resembles "2048", the differences are: the dropout of cells 1 or 2,
* you can also combine horizontally, vertically and at the corners of the selected goal
* @author Ruslan Sayfutdinov   https://github.com/ehoop1337/Game1221.js
* @param1 {string} selector    To which DOM element are we creating an instance of the class
*/
"use strict";

class Game1221 {
    constructor(selector) {
        this.countField = 16;
        this.collumnAndRow = 4;
        this.fieldSize = 70;
        this.fieldBorderWidth = 1;
        this.countCreateObjects = 10;
        this.fieldEmptyColor = "#eee";
        this.fieldColorText = "#000";
        this.fieldHoverColor = "#e4e4e4";
        this.fieldActiveColor = "orange"; 
        this.fieldActiveColorText = "#fff";
        this.fieldBorderColor = "#fff";
        this.fields = [];
        this.game = document.querySelector(selector);
        this.initStyleBody();
        this.initStylesForGameField();
        this.createFieldsAndInitStyles();
        this.createButton();
        this.createObjects();
        this.createScore();
        this.render();
    }

    createScore() {
        let div = document.createElement("section");
        let span = document.createElement("span");
        span.id="score";
        div.innerHTML = "Score: ";
        span.innerHTML = "0";
        div.appendChild(span);
        div.style.position = "absolute";
        div.style.left = "0";
        div.style.right = "0";
        div.style.fontSize = "18px";
        div.style.bottom = "calc(100% + 10px)";
        this.game.appendChild(div);
    }

    createButton() {
        let button = document.createElement("button");
        button.innerHTML = "Restart";
        button.style.position = "absolute";
        button.style.left = "0";
        button.style.right = "0";
        button.style.top = "calc(100% + 10px)";
        button.style.margin = "0 auto";
        button.style.padding = "7px 20px 8px 20px";
        this.game.appendChild(button);
        button.addEventListener("click", () => {
            this.restart();
        });
    }

    restart() {
        window.location.reload();
    }

    initStyleBody() {
        document.body.style.boxSizing = "border-box";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
    }

    initStylesForGameField() {
        this.game.style.display = "flex";
        this.game.style.flexWrap = "wrap";
        this.game.style.position = "relative";
        this.game.style.width = this.fieldSize * this.collumnAndRow + "px";
    }

    createFieldsAndInitStyles() {
        for (let i = 0; i < this.countField; i++) {
            let elem = document.createElement("div");
            elem.id = "field-" + (i + 1);
            elem.style.display = "flex";
            elem.style.justifyContent = "center";
            elem.style.alignItems = "center";
            elem.style.fontSize = "20px";
            elem.style.fontWeight = "700";
            elem.style.background = this.fieldEmptyColor;
            elem.style.width =
                this.fieldSize - this.fieldBorderWidth * 2 + "px";
            elem.style.height =
                this.fieldSize - this.fieldBorderWidth * 2 + "px";
            elem.style.border =
                "solid " +
                this.fieldBorderWidth +
                "px " +
                this.fieldBorderColor;
            this.game.appendChild(elem);
            this.fields.push({ element: elem, object: 0, active: false });
            elem.addEventListener("click", () => {
                if (elem.innerHTML.length > 0) {
                    if (elem.classList != "active") {
                        elem.classList.add('active');
                            this.logicGame(elem);
                            this.checkDual(elem);
                    } else {
                        elem.classList.remove('active');
                        for(let j = 0; j < this.fields.length; j++){
                            this.fields[j].active = false;
                        }
                    }
                    this.render();
                }
            });
        }
    }

    logicGame(e) {
        const regEx = /[^\d\+]/g;
        let id = parseInt(e.id.replace(regEx, '')) - 1;
        this.fields[id].active = true;
    }

    createObjects(createObjInGame = 0) {
        let countEmpty = 0;
        let arrayEmptyObjects = [];
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].object == 0) {
                countEmpty += 1;
                arrayEmptyObjects.push(i);
            }
        }
        let countCreate = this.countCreateObjects;
        if (createObjInGame > 0) {
            if(countEmpty > (this.countField / this.collumnAndRow)){
                countCreate = this.getRandom(2, 5)
            } else if (countEmpty > (this.collumnAndRow)) {
                countCreate = this.getRandom(1, 4)
            } else if (countEmpty > 1) {
                countCreate = this.getRandom(0, 2)
            } else if (countEmpty == 1) {
                countCreate = 1;
            } else {
                countCreate = 0;
            }
        }
        
        if (countEmpty < countCreate && countEmpty != 0) {
            for (let i = 0; i < arrayEmptyObjects.length; i++) {
                let obj = this.createGameObject(arrayEmptyObjects[i]);
                this.fields[arrayEmptyObjects[i]].object = obj.object;
            }
        } else if (countEmpty == 0) {
            this.sendNotice("There are no empty cells!");
        } else {
            for (let i = 0; i < countCreate; i++) {
                let obj = this.createGameObject();
                this.fields[obj.field].object = obj.object;
            }
        }
    }

    sendNotice(message) {
        alert(message);
    }

    createGameObject(arrEmptyObj = null) {
        if (arrEmptyObj == null) {
            let rnd = this.getRandom(0, this.countField);
            if (this.fields[rnd].object == 0) {
                return {
                    field: rnd,
                    object: this.getRandom(1, 3),
                };
            } else {
                return this.createGameObject();
            }
        } else {
            return {
                field: arrEmptyObj,
                object: this.getRandom(1, 3),
            };
        }
    }

    getRandom(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    newPick(count = 0) {
        this.createObjects(count);
        this.render();
    }

    checkDual(elem) {
        const regEx = /[^\d\+]/g;
        let id = parseInt(elem.id.replace(regEx, '')) - 1;
        for (let i = 0; i < this.fields.length; i++) {
            if(id != i){
                if(this.fields[id].active == this.fields[i].active && this.fields[id].active != false && this.fields[i].active != false){
                    if (this.fields[id].object == this.fields[i].object) {
                        let up = false;
                        let upRight = false;
                        let right = false;
                        let rightDown = false;
                        let down = false;
                        let downLeft = false;
                        let left = false;
                        let leftUp = false;
                        if ( (i - this.collumnAndRow) >= 0 && (i - this.collumnAndRow) == id) {
                            up = true;
                        }
                        if ( (i - this.collumnAndRow) >= 0 && ( (i + 1) % this.collumnAndRow) != 0 && (i - (this.collumnAndRow - 1)) == id) {
                            upRight = true;
                        }
                        if ( (i - this.collumnAndRow) >= 0 && ( i % this.collumnAndRow) != 0 && (i - (this.collumnAndRow + 1)) == id) {
                            leftUp = true;
                        }
                        if ( (i + this.collumnAndRow) < this.countField && (i + this.collumnAndRow) == id) {
                            down = true;
                        }
                        if ( i < this.countField - this.collumnAndRow && (i + 1) % this.collumnAndRow != 0 && (i + (this.collumnAndRow + 1)) == id ) {
                            rightDown = true;
                        }
                        if ( i < this.countField - this.collumnAndRow &&  (i % this.collumnAndRow) != 0 && (i + (this.collumnAndRow -1)) == id) {
                            downLeft = true;
                        }
                        if ( ((i + 1) % this.collumnAndRow) != 0 && (i + 1) == id) {
                            right = true;
                        }
                        if ( (i % this.collumnAndRow) != 0 && (i - 1) == id) {
                            left = true;
                        }
                        if (up || upRight || right || rightDown || down || downLeft || left || leftUp) {
                            if (this.fields[id].object == 1) {
                                this.fields[id].object = 2;
                            } else {
                                this.fields[id].object = this.fields[id].object + this.fields[id].object;
                            }
                            this.fields[id].element.classList.remove('active');
                            this.fields[id].active = false;
                            this.fields[i].object = "";
                            this.fields[i].element.classList.remove('active');
                            this.fields[i].active = false;
                            this.newPick(2);
                        } else {
                            alert('error');
                            this.fields[id].element.classList.remove('active');
                            this.fields[id].active = false;
                            this.fields[i].element.classList.remove('active');
                            this.fields[i].active = false;
                        }
                    } else {
                        this.fields[id].element.classList.remove('active');
                        this.fields[id].active = false;
                        this.fields[i].element.classList.remove('active');
                        this.fields[i].active = false;
                    }
                }
            }
        }
    }

    render() {
        let score = 0;
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].object == 0) {
                this.fields[i].element.innerHTML = "";
            } else {
                this.fields[i].element.innerHTML = this.fields[i].object;
                score += this.fields[i].object
            }
        }
        let scoreHtml = document.querySelector("#score");
        scoreHtml.innerHTML = score;
    }
}