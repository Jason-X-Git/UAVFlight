import React, {useEffect, useState} from "react";
import esriLoader from "esri-loader";
import {makeStyles} from "@material-ui/core/styles";
import selectFlights from "../selector/selectFlights";
import {connect} from "react-redux";

const statusTypes = {
    RUNNING: "RUNNING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    STOPPED: "STOPPED",
};

const colorTypes = {};
colorTypes[statusTypes.RUNNING] = "blue";
colorTypes[statusTypes.SUCCESS] = "green";
colorTypes[statusTypes.FAILURE] = "red";
colorTypes[statusTypes.STOPPED] = "brown";

const useStyles = makeStyles((theme) => ({
    mapDiv: {
        width: "100%",
        height: "500px",
        margin: "10px 0 10px 0 ",
        padding: "5px 0"
    },
}));

const MapView = (props) => {

    const flights = props.flights;


    const [display, setDisplay] = useState(true);

    const classes = useStyles();

    const loadData = () => {
        const options = {
            url: "https://js.arcgis.com/4.15/init.js",
            css: "https://js.arcgis.com/4.15/esri/themes/light/main.css",
        };

        esriLoader
            .loadModules(
                [
                    "esri/Map",
                    "esri/views/MapView",
                    "esri/layers/Layer",
                    "esri/widgets/CoordinateConversion",
                    "esri/widgets/Search",
                    "esri/Graphic",
                    "esri/layers/GraphicsLayer",
                ],
                options
            )
            .then(
                ([
                     Map,
                     MapView,
                     Layer,
                     CoordinateConversion,
                     Search,
                     Graphic,
                     GraphicsLayer,
                 ]) => {
                    // doSomeThing

                    const map = new Map({
                        basemap: "topo-vector",
                    });

                    const view = new MapView({
                        container: "app",
                        map: map,
                        center: [-115, 55],
                        zoom: 5,
                    });

                    var coordinateConversionWidget = new CoordinateConversion({
                        view: view,
                    });
                    var searchWidget = new Search({
                        view: view,
                    });

                    view.ui.components = ["attribution", "compass", "zoom"];

                    view.ui.add(coordinateConversionWidget, {
                        position: "bottom-left",
                        index: 0,
                    });
                    view.ui.add(searchWidget, {position: "top-right", index: 1});

                    var graphicsLayer = new GraphicsLayer();
                    map.add(graphicsLayer);

                    const addPoint = (point) => {
                        console.log(`Adding point ${point.uav_no} ${point.latitude} ${point.longitude}`);
                        var simpleMarkerSymbol = {
                            type: "simple-marker",
                            color: point.latest_status ? colorTypes[point.latest_status] : 'black', // orange
                            outline: {
                                color: [255, 255, 255], // white
                                width: 1,
                            },
                        };
                        var pointGraphic = new Graphic({
                            geometry: point,
                            symbol: simpleMarkerSymbol,
                        });

                        var textGraphic = new Graphic({
                            geometry: point,
                            symbol: {
                                type: "text",
                                color: [25, 25, 25],
                                haloColor: [255, 255, 255],
                                haloSize: "2px",
                                text: point.uav_no,
                                xoffset: 0,
                                yoffset: -25,
                                font: {
                                    size: 12,
                                    weight: "bolder",
                                },
                            },
                        });

                        graphicsLayer.add(pointGraphic);
                        graphicsLayer.add(textGraphic);
                    };

                    flights.map((point) => addPoint(point));
                }
            )
            .catch((err) => {
                console.error("Failed to initialize !!!", err);
            });
    };

    useEffect(() => {
        console.log("useEffect ran !");
        loadData();
    }, [display, flights, loadData]);

    return (
        <div>
            < input type="submit" value={!display ? "Show Flights Map" : "Hide Flights Map"}
                    onClick={() => setDisplay(!display)}></input>
            {display ?
                <div
                    id="app" className={classes.mapDiv}
                >
                </div> :
                null
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        flights: selectFlights(state.flights, state.filters)
    };
};

export default connect(mapStateToProps)(MapView);

