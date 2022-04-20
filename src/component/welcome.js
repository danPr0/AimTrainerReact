import React, {useEffect, useRef, useState} from "react";
import Menu from "./menu";
import axios from "axios";
import renewAccessToken from "./authentication/renewAccessToken";
import {useNavigate} from "react-router-dom";

function sendResult(result, size, navigate) {
    axios
        .post("/save-result", {result: result, size: size})
        .catch((error) => {
            console.log(error.toJSON);
            if (error.response.status === 401) {
                renewAccessToken();
                console.log(localStorage.getItem("authenticated"));
                if (localStorage.getItem("authenticated"))
                    sendResult(result);
                else navigate("/login");
            }
        });
}

// noinspection JSValidateTypes
export default function Welcome() {
    const navigate = useNavigate();
    let [aimLocation, setAimLocation] = useState(calculateLocation(false));
    let [date, setDate] = useState(new Date().getTime());
    let interval = useRef("500");
    let size = useRef("sm");
    let gameInfo = useRef({activated: false, shotTime: 0, aimsLeft: 0, total: 0});
    let startButton = useRef();
    let removedAim = useRef();

    function processShot() {
        let game = gameInfo.current;
        game.aimsLeft--;
        if (!game.aimsLeft)
            game.activated = false;
        game.shotTime = new Date().getTime() - date;
        game.total += game.shotTime;
    }

    function getInfoBar() {
        let game = gameInfo.current;
        let info = "";

        if (game.aimsLeft) {
            info = `${game.aimsLeft} left`;
            info += "     Last shot:   "
            if (game.shotTime)
                info += `${game.shotTime}`
        }
        else if (game.total) info = `Average:  ${(game.total / 5.0).toFixed(1)}`
        return info;
    }

    function calculateLocation(disabled) {
        let xWindow = document.body.scrollWidth;
        let yWindow = document.body.scrollHeight;
        console.log(xWindow, yWindow);
        let x = (Math.random() * (xWindow - 100) + 30).toString();
        let y = (Math.random() * (yWindow - 250) + 175).toString();
        return({x: x, y: y, disabled: disabled});
    }

    useEffect(() => {
        console.log(aimLocation.x, aimLocation.y);
        let aimHolder = document.getElementById("aimHolder");

        if (aimHolder.firstChild !== null)
            removedAim.current = aimHolder.removeChild(aimHolder.firstChild);
        let activated = gameInfo.current.activated;

        if (activated) {
            removedAim.current.style.position = "absolute";
            removedAim.current.style.top = aimLocation.y + "px";
            removedAim.current.style.left = aimLocation.x + "px";

            setTimeout(() => {
                aimHolder.appendChild(removedAim.current);
                setDate(new Date().getTime());
            }, parseInt(interval.current, 10));
        }

        return () => {
            if (!activated) {
                let startButtonArea = document.getElementById("startButton");
                startButton.current = startButtonArea.removeChild(startButtonArea.firstChild);
            }
            else {
                //processShot();
                if (gameInfo.current.aimsLeft === 0) {
                    document.getElementById("startButton").appendChild(startButton.current);
                    sendResult((gameInfo.current.total / 5).toFixed(3), size.current, navigate);
                    gameInfo.current.shotTime = 0;
                    gameInfo.current.total = 0;
                }
            }
        };
    }, [aimLocation, navigate]);

    return (
        <div className="container-fluid px-3 bg-black" style={{height: "100vh"}}>
            <div>
                <Menu/>
            </div>

            <div className="container-fluid d-flex px-3 bg-black">
                <select name="interval" id="interval" className="m-auto" disabled={!!(gameInfo.current.activated)}
                        onChange={(event) => {
                            interval.current = event.target.value;
                            console.log(interval);
                        }}>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="2000">1500</option>
                    <option value="2000">2000</option>
                </select>

                <span id="startButton" className="mx-auto">
                    <button id="startButton" className="btn btn-secondary" onClick={() => {
                        gameInfo.current.activated = true;
                        gameInfo.current.aimsLeft = 5;
                        setAimLocation(calculateLocation(false));
                    }}>
                        Start
                    </button>

                    {/*<p className="text-white my-0">*/}
                    {/*    {(gameInfo.current.shotTime && gameInfo.current.activated)*/}
                    {/*        ? `Last shot: ${gameInfo.current.shotTime} ms` : "Current"}*/}
                    {/*</p>*/}
                </span>

                <select name="size" id="size" className="m-auto" disabled={!!(gameInfo.current.activated)}
                        onChange={(event) => size.current = event.target.value}>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                </select>
            </div>

            <div className="container-fluid d-flex px-3 bg-black justify-content-center">
                <pre className="text-white">
                    {getInfoBar()}
                </pre>
            </div>

            <div id="aimHolder">
                <button id="aim" className={`btn btn-${size.current} btn-primary`}
                        onClick={() => {
                            processShot();
                            setAimLocation(calculateLocation(false))
                        }}>
                    Russia
                </button>
            </div>
        </div>
    )
}