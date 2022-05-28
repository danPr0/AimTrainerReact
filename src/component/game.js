import React, {useEffect, useRef, useState} from "react";
import Menu from "./menu";
import axios from "axios";
import renewAccessToken from "./authentication/renewAccessToken";
import {useNavigate} from "react-router-dom";

const maxAims = 5;

// noinspection JSValidateTypes
const Game = () => {
    const navigate = useNavigate();
    const [aimLocation, setAimLocation] = useState({x: null, y: null});
    const [date, setDate] = useState(new Date().getTime());
    let gameInfo = useRef({activated: false, setUpDisabled: false, shotTime: 0, aimsLeft: maxAims, total: 0, interval: "500", size: "sm"});
    let game = gameInfo.current;
    let startButton = useRef();
    let aim = useRef();

    useEffect(() => {
        let aimHolder = document.getElementById("aimHolder");
        const changeAimLocation = () => {
            aim.current.style.position = "absolute";
            aim.current.style.top = aimLocation.y + "px";
            aim.current.style.left = aimLocation.x + "px";
        }
        const resetGameProps = () => {
            game.activated = false;
            game.aimsLeft = maxAims;
            game.shotTime = 0;
            game.total = 0;
        }
        const sendResult = (result, size) => {
            axios
                .post("/save-result", {result: result, size: size})
                .catch(() => {
                    if (renewAccessToken())
                        sendResult(result);
                    else navigate("/login");
                });
        }

        if (aimHolder.firstChild !== null)
            aim.current = aimHolder.removeChild(aimHolder.firstChild);

        if (game.activated) {
            changeAimLocation();
            setTimeout(() => {
                aimHolder.appendChild(aim.current);
                setDate(new Date().getTime());
            }, parseInt(game.interval, 10));
        }

        return () => {
            if (game.activated && game.aimsLeft === 0) {
                document.getElementById("startButton").appendChild(startButton.current);
                sendResult((game.total / maxAims).toFixed(3), game.size);
                resetGameProps(game);
            } else if (game.activated && game.aimsLeft === maxAims) {
                let startButtonArea = document.getElementById("startButton");
                startButton.current = startButtonArea.removeChild(startButtonArea.firstChild);
            }
        };
    }, [aimLocation, game, navigate]);

    return (
        <div className="container-fluid px-3 bg-black" style={{height: "100vh"}}>
            <div>
                <Menu/>
            </div>

            <div className="container-fluid d-flex px-3 bg-black">
                <select name="interval" id="interval" className="m-auto" disabled={!!(game.setUpDisabled)}
                        onChange={(event) => game.interval = event.target.value}>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="2000">1500</option>
                    <option value="2000">2000</option>
                </select>

                <span id="startButton" className="mx-auto">
                    <button className="btn btn-secondary" onClick={() => {
                        game.activated = true;
                        game.setUpDisabled = true;
                        setAimLocation(calculateLocation());
                    }}>
                        Start
                    </button>
                </span>

                <select name="size" id="size" className="m-auto" disabled={!!(game.setUpDisabled)}
                        onChange={(event) => game.size = event.target.value}>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                </select>
            </div>

            <div className="container-fluid d-flex px-3 bg-black justify-content-center">
                <pre className="text-white">
                    {game.activated && getInfoBar()}
                </pre>
            </div>

            <div id="aimHolder">
                <button id="aim" className={`btn btn-${game.size} btn-primary`}
                        onClick={() => processShot()}>
                    Russia
                </button>
            </div>
        </div>
    )

    function processShot() {
        game.setUpDisabled = --game.aimsLeft;
        game.shotTime = new Date().getTime() - date;
        game.total += game.shotTime;
        setAimLocation(calculateLocation());
    }

    function calculateLocation() {
        let x = (Math.random() * (document.body.scrollWidth - 100) + 30).toString();
        let y = (Math.random() * (document.body.scrollHeight - 250) + 175).toString();
        return ({x: x, y: y});
    }

    function getInfoBar() {
        let info;
        if (game.aimsLeft === 0)
            info = (game.total !== 0) ? `Average:  ${(game.total / maxAims).toFixed(1)}` : "";
        else {
            info = `${game.aimsLeft} left`;
            info += "     Last shot:   "
            info += (game.shotTime !== 0) ? `${game.shotTime}` : "";
        }
        return info;
    }
}

export default Game;
