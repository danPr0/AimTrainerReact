import axios from "axios";
import Menu from "./menu";
import React, {useEffect, useRef, useState} from "react";
import {Table} from "react-bootstrap";
import ReactDOM from "react-dom";
import renewAccessToken from "./authentication/renewAccessToken";
import {useNavigate} from "react-router-dom";

export default function ScoresTable() {
    let results = useRef([]);
    let navigate = useNavigate();
    let [sortedField, setSortedField] = useState(null);

    useEffect(() => {
        if (sortedField !== null) {
            results.current.sort((a, b) => {
                if (a[sortedField] > b[sortedField]) {
                    return 1;
                }
                if (a[sortedField] < b[sortedField]) {
                    return -1;
                }
                return 0;
            });
            addTable();
        }
    }, [sortedField]);

    function addTable() {
        ReactDOM.render(
            results.current.map((result, index) => {
                /** @param {{username, smResult, mdResult, lgResult}} result**/
                return (
                    <tr key={index}>
                        <td className="text-white">{index + 1}</td>
                        <td className="text-white">{result.username}</td>
                        <td className="text-white">{result.smResult}</td>
                        <td className="text-white">{result.mdResult}</td>
                        <td className="text-white">{result.lgResult}</td>
                    </tr>
                );
            }),
            document.getElementById("tableBody")
        );
    }

    useEffect(() => {
        function getResults() {
            axios
                .get("/get-results")
                .then((response) => {
                    console.log(response.data);
                    results.current = response.data;
                    addTable();
                })
                .catch((error) => {
                    console.log(error.toJSON());
                    renewAccessToken().then(ifSuccessful => {
                        if (ifSuccessful)
                            getResults();
                        else navigate("/login");
                    })
                });
        }
        
        getResults();
    }, [navigate]);

    return (
        <div className="container-fluid px-3 bg-black" style={{height: "100vh"}}>
            <div>
                <Menu/>
            </div>

            <Table striped bordered hover className="text-white">
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Nickname
                    </th>
                    <th>
                        <button type="button" onClick={() => setSortedField("smResult")}>
                            Small
                        </button>
                    </th>
                    <th>
                        <button type="button" onClick={() => setSortedField("mdResult")}>
                            Medium
                        </button>
                    </th>
                    <th>
                        <button type="button" onClick={() => setSortedField("lgResult")}>
                            Large
                        </button>
                    </th>
                </tr>
                </thead>

                <tbody id="tableBody" className="text-white">

                </tbody>
            </Table>
        </div>
    );
}